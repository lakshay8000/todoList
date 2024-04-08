export const filterTodosByStatus = (todos, status) => {
    return todos.filter(todo => todo.status === status);
};