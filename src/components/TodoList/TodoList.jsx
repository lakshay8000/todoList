import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";
import TodoInput from "../TodoInput/TodoInput";
import "./todoList.css";


function TodoList() {
    const category= useSelector(state => state.todos.category);

    const todoList = useSelector(state => {
        if (category === "All") {
            return state.todos.All;
        }
        else if (category === "Pending") {
            return state.todos.Pending;
        }
        else if (category === "Finished") {
            return state.todos.Finished;
        }
    });

    return (
        <div className="container">
            <TodoInput />

            <h2 className="mt-5">{category} tasks-</h2>

            <div className="d-flex mt-4 mb-3">
                <h4 className="serial-number pe-3">No.</h4>
                <h4 className="todo-task pe-3">To Do Task</h4>
                <h4 className="status pe-3">Status</h4>
                <h4 className="actions pe-3">Actions</h4>
            </div>

            {
                todoList && todoList.map((todo, idx) => {
                    return (
                        <Todo 
                            id={todo.id} 
                            title={todo.title} 
                            key={todo.id} 
                            serialNumber= {idx + 1}
                            status= {todo.status}
                        />
                    );
                })
            }
        </div>
    );
}

export default TodoList;