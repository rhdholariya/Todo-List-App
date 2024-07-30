import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Input} from "reactstrap";

const TodoItem = ({index, todo, onComplete, onEdit, onDelete, isEditing, setEditing}) => {
    const [editedTodo, setEditedTodo] = useState();

    return (
        <li id={index} className="todo_item gap-3">
            {isEditing ? (
                <div>
                    <label htmlFor="edit-todo">
                        <Input
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={todo?.task}
                            onChange={(e) => setEditedTodo(e.target.value)}
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
                    <p className="mb-0" style={todo.isCompleted ? {textDecoration: "line-through"} : {}}>
                        {todo?.task}
                    </p>
                </div>
            )}
            <div className="gap-2 d-flex">
                {isEditing ? (
                    <Button variant="outline-info" className="mr-2" onClick={() => {
                        onEdit(todo, editedTodo);
                        setEditing(false)
                    }}>
                        Save
                    </Button>
                ) : (
                    <Button variant="outline-success" className="mr-2" onClick={() => setEditing(todo._id)}>
                        Edit
                    </Button>
                )}
                <Button variant="outline-danger" onClick={() => onDelete({show: true, data: todo._id})}>
                    Remove
                </Button>
            </div>
        </li>
    );
};

export default TodoItem;