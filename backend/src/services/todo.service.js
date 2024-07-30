const Todo = require("../models/todo.model.js");

const updateTodoById  = async (id,data) => {
    try{
        const result = await Todo.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
        return result;
    } catch(err){
        console.error(err);
        return false;
    }
}
const createTodo = async (data) => {
    try {
        const result = await Todo.create(data);
        return result;
    } catch (error) {
        console.error('Error creating Todo:', error);
        throw error;
    }
};

const removeTodo = async (id) => {
    try {
        const result = await Todo.findByIdAndDelete({
            _id:id
        });
        return result;
    } catch (error) {
        console.error('Error creating Todo:', error);
        throw error;
    }
};

const getAllTodos = async () => {
    try {
        const todos = await Todo.find();
        return todos;
    } catch (error) {
        console.error('Error getting Todos:', error);
        throw error;
    }
}

const getTodoByTask = async (task) => {
    try {
        const result = await Todo.findOne({ task });
        return result;
    } catch (error) {
        console.error('Error fetching Todo by task:', error);
        throw error;
    }
};

module.exports = {updateTodoById,createTodo,removeTodo ,getAllTodos, getTodoByTask};
