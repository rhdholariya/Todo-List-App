import React, { useEffect, useState } from "react";
import TodoItem from "../../Components/TodoItem";
import { Button, Col, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import Header from "../../Components/Header";
import HeroSection from "./HeroSection";
import DeleteTodo from "../../Components/DeleteTodo";
import ServiceProvider from "../../Services/ServiceProvider";
import toast from "react-hot-toast";
import { Todo, useTodoContext } from "../../Context/TodoContext";

interface ApiResponse {
  message: string;
  todo?:Todo;
  todoList: Todo[];
}

const TodoList: React.FC = () => {
  const {todos, setTodos,showRemoveModal,setShowRemoveModal} = useTodoContext();
  const { getData, postData, putData, deleteData } = ServiceProvider();
  const baseUrl = import.meta.env.VITE_AXIOS_BASE_URL as string;
  const [addValue, setAddValue] = useState<string>("");
  const [editing, setEditing] = useState<string | boolean>(false);
  const [editingId, setEditingId] = useState<string | boolean | null >(null);

  useEffect(() => {
    getData("")
      .then((response:any) => {
        setTodos(response.todoList);
      })
      .catch(() => {
        toast.error("Error while Getting To Do");
      });
  }, []);

  const handleComplete = (data: Todo, value: boolean) => {
    putData(`${baseUrl}/${data._id}`, { isCompleted: value })
      .then(() => {
        setTodos(
          todos.map((todo:any) =>
            todo._id === data._id
              ? { ...todo, isCompleted: !todo.isCompleted }
              : todo
          )
        );
      })
      .catch((err:any) => {
        toast.error(err.response.data.message);
      });
  };

  const handleEdit = (data: Todo, newText: string | undefined) => {
    setEditing(!editing);
    putData(`${baseUrl}/${data._id}`, { task: newText })
      .then((res:ApiResponse) => {
        getData("")
          .then((response:ApiResponse) => {
            setTodos(response.todoList);
          })
          .catch(() => {});
        toast.success(res.message);
      })
      .catch((err:any) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = (id: string | null) => {
    if (!id) return;
    deleteData(`${baseUrl}/${id}`)
      .then((res:ApiResponse) => {
        getData("")
          .then((response:ApiResponse) => {
            setTodos(response.todoList);
          })
          .catch(() => {});
        toast.success(res.message);
      })
      .catch((err:any) => {
        toast.error(err.response.data.message);
      });
  };

  const addList = () => {
    let data = todos || [];
    postData(baseUrl, { task: addValue.trim() })
      .then((response:any) => {
        data.push(response.todo);
        setTodos([...data]);
        setAddValue("");
        toast.success(response.message);
      })
      .catch((err:any) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        }
      });
  };

  const todos_completed = (todos || []).filter((todo:Todo) => todo.isCompleted).length;

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <HeroSection
          todos_completed={todos_completed}
          total_todos={(todos || []).length}
        />
      </div>
      <div>
        <Row className="d-flex justify-content-center">
          <Col md={10} className="p-0">
            <form onSubmit={(e) => {
                e.preventDefault();
                addList();
            }} className="d-flex align-items-end mb-2 gap-2 justify-content-center mb-4">
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
                // onClick={() => addList()}
                disabled={!(addValue && addValue.trim())}
              >
                + Add
              </Button>
            </form>
            <div className="todo_list_table d-flex justify-content-center">
              {(todos || []).length === 0 ? (
                <div className="p-5">No data available</div>
              ) : (
                <div>
                  <ul className="">
                    {(todos || []).map((todo:Todo, index:number) => (
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
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <DeleteTodo
        onDelete={() => {
          handleDelete(showRemoveModal.data);
          setShowRemoveModal({ show: !showRemoveModal.show, data: null });
        }}
      />
    </>
  );
};

export default TodoList;
