import React, { useEffect, useState } from "react";
import TodoItem from "../../components/TodoItem.jsx";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import Header from "../../components/Header.jsx";
import HeroSection from "./HeroSection.jsx";
import DeleteTodo from "../../components/deleteTodo.jsx";
import ServiceProvider from "../../services/ServiceProvider.jsx";
import toast from "react-hot-toast";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { getData, postData, putData, deleteData } = ServiceProvider();
  const baseUrl = import.meta.env.VITE_AXIOS_BASE_URL;
  const [showRemoveModal, setShowRemoveModal] = useState({
    show: false,
    data: null,
  });
  const [addValue, setAddValue] = useState("");
  const [editing, setEditing] = React.useState(false);
  const [editingId, setEditingId] = React.useState(false);

  useEffect(() => {
    getData("")
      .then((response) => {
        setTodos(response.todoList);
      })
      .catch(() => {
        toast.error("Error while Getting To Do");
      });
  }, []);

  const handleComplete = (data, value) => {
    putData(`${baseUrl}/${data._id}`, { isCompleted: value })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === data._id
              ? { ...todo, isCompleted: !todo.isCompleted }
              : todo
          )
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleEdit = (data, newText) => {
    setEditing(!editing);
    putData(`${baseUrl}/${data._id}`, { task: newText })
      .then((res) => {
        getData("")
          .then((response) => {
            setTodos(response.todoList);
          })
          .catch(() => {});
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = (id) => {
    deleteData(`${baseUrl}/${id}`)
      .then((res) => {
        getData("")
          .then((response) => {
            setTodos(response.todoList);
          })
          .catch(() => {});
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const addList = () => {
    let data = todos || [];
    postData(baseUrl, { task: addValue.trim() })
      .then((response) => {
        data.push(response.todo);
        setTodos([...data]);
        setAddValue("");
        toast.success(response.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        }
      });
  };
  const todos_completed = (todos || []).filter(
    (todo) => todo.isCompleted
  ).length;

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <HeroSection
          todos_completed={todos_completed}
          total_todos={(todos || []).length}
        />
      </div>
      <Container>
        <Row className="w-100 d-flex justify-content-center">
          <Col md={10} className="p-0">
            <div className="d-flex align-items-end mb-2 gap-2 justify-content-center mb-4">
              <Input
                type="text"
                name="todo"
                id="todo"
                className="w-auto"
                placeholder="Write your next task"
                value={addValue}
                onChange={(e) => setAddValue(e.target.value)}
              />
              <Button
                type="submit"
                className="add_task"
                onClick={() => addList()}
                disabled={!(addValue && addValue.trim())}
              >
                + Add
              </Button>
            </div>
            <div className="todo_list_table d-flex justify-content-center">
              {(todos || []).length === 0 ? (
                <div className="p-5">No data available</div>
              ) : (
                <ul className="w-50">
                  {(todos || []).map((todo, index) => (
                    <TodoItem
                      key={todo._id}
                      index={index + 1}
                      todo={todo}
                      onComplete={handleComplete}
                      onEdit={handleEdit}
                      onDelete={setShowRemoveModal}
                      isEditing={editingId === todo._id}
                      setEditing={setEditingId}
                    />
                  ))}
                </ul>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <DeleteTodo
        showRemoveModal={showRemoveModal}
        onDelete={() => {
          handleDelete(showRemoveModal.data);
          setShowRemoveModal({ show: !showRemoveModal, data: null });
        }}
        setShowRemoveModal={setShowRemoveModal}
      />
    </>
  );
};

export default TodoList;
