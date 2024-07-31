const Todo = require("../models/todo.model.js");
const todoSchema = require("../utils/validation.js");
const {todoMessage} = require('../config/message.js');
const {createTodo, updateTodoById, removeTodo, getAllTodos, getTodoByTask} = require('../services/todo.service');

const create = async (req, res) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { task } = req.body;
        const existingTodo = await getTodoByTask(task);
        if (existingTodo) {
            return res.status(400).json({ message: todoMessage.error.duplicateTask });
        }
        const newTodo = await createTodo({ task: task.trim() });
        if (!newTodo) {
            return res.status(400).json({ message: todoMessage.error.todoCreateFailure });
        }
        return res.status(201).json({ message: todoMessage.success.todoCreateSuccess ,todo: newTodo  });
    } catch (err) {
        return res.status(500).json({ message: todoMessage.error.genericError });
    }
};

const allList = async (req, res) => {
    try {
        const todoList = await getAllTodos();
        if (todoList.length === 0) {
            return res.status(200).json({ message: todoMessage.error.todosNotFound , todoList:[]});
        }
        return res.status(200).json({ message: todoMessage.success.fetchTodosSuccess , todoList });
    } catch (err) {
        return res.status(500).json({ message: todoMessage.error.genericError });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { task, isCompleted } = req.body;
        const existingTodo = await getTodoByTask(task);
        if (existingTodo) {
            return res.status(400).json({ message: todoMessage.error.duplicateTask });
        }
        if(!task){
            const updatedTodo = await updateTodoById(id,{ isCompleted });
            if (!updatedTodo) {
                return res.status(404).json({ message: todoMessage.error.todoNotFound });
            }
        }
        const updatedTodo = await updateTodoById(id,{ task, isCompleted });
        if (!updatedTodo) {
            return res.status(404).json({ message: todoMessage.error.todoNotFound });
        }
        return res.status(200).json({ message: todoMessage.success.todoUpdateSuccess ,todoList:updatedTodo });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: todoMessage.error.genericError });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await removeTodo(id);
        if (!deleteTodo) {
            return res.status(404).json({ message: todoMessage.error.todoNotFound });
        }
        return res.status(200).json({ message: todoMessage.success.todoDeleteSuccess });
    } catch (err) {
        return res.status(500).json({ message: todoMessage.error.genericError });
    }
};

module.exports = {create,allList,update,remove}