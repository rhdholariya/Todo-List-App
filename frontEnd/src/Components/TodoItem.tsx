import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Input } from "reactstrap";

interface Todo {
  _id: string;
  task: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  index: number;
  todo: Todo;
  onComplete: (todo: Todo, isCompleted: boolean) => void;
  onEdit: (todo: Todo, editedTask: string | undefined) => void;
  onDelete: (modalState: { show: boolean; data: string }) => void;
  isEditing: boolean;
  setEditing: (id: string | boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  index,
  todo,
  onComplete,
  onEdit,
  onDelete,
  isEditing,
  setEditing,
}) => {
  const [editedTodo, setEditedTodo] = useState<string | undefined>(undefined);

  return (
    <li id={String(index)} className="todo_item gap-3">
      {isEditing ? (
        <div>
          <label htmlFor="edit-todo">
            <Input
              className="no-resize"
              type="textarea"
              name="edit-todo"
              id="edit-todo"
              defaultValue={todo?.task}
              onChange={(e) => setEditedTodo(e.target.value)}
              rows="5"
            />
          </label>
        </div>
      ) : (
        <div className="d-flex gap-2">
          <Input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(e) => onComplete(todo, e.target.checked)}
          />
          <p
            className="mb-0"
            style={todo.isCompleted ? { textDecoration: "line-through" } : {}}
          >
            {todo?.task}
          </p>
        </div>
      )}
      <div className="gap-2 d-flex">
        {isEditing ? (
          <Button
            variant="outline-info"
            className="mr-2"
            onClick={() => {
              onEdit(todo, editedTodo);
              setEditing(false);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outline-success"
            className="mr-2"
            onClick={() => setEditing(todo._id)}
          >
            Edit
          </Button>
        )}
        <Button
          variant="outline-danger"
          onClick={() => onDelete({ show: true, data: todo._id })}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
