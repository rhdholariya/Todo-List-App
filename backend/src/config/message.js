const todoMessage ={
    success:{
        todoCreateSuccess: 'Todo created successfully',
        fetchTodosSuccess: 'Todo list successfully fetched',
        todoUpdateSuccess: 'Todo updated successfully',
        todoDeleteSuccess: 'Todo deleted successfully',
    },
    error:{
        todoDeleteFailure: 'Todo unable to delete',
        todoUpdateFailure: 'Todo unable to update',
        serverError: 'Internal server error',
        todosNotFound: 'Todos not found',
        todoCreateFailure: 'Todo unable to create',
        todoNotFound: 'Todo not found',
        genericError: "An error occurred. please try again later.",
        duplicateTask:"Duplicate task not allowed",
        handleUnconvational:'Handling unconventional todo route'
    }
}

module.exports = {todoMessage};
