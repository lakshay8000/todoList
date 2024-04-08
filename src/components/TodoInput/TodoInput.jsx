import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, changeCategory } from "../../slices/todosSlice";
import "./todoInput.css";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TodoInput() {
    const [inputText, setInputText] = useState("");  // local state

    const dispatch = useDispatch();  

    // we will call it when we press the add button-
    function insertTodo() {
        // if input is not empty-
        if (inputText.trim() === "") {
            toast.error("Please enter a valid todo task");
        }
        if (inputText != "") {
            dispatch(addTodo({ id: uuidv4(), title: inputText, status: "Pending" }));
            setInputText("");
        }
    }

    function updateCategory(e) {
        if (e.target.textContent === "Get pending tasks") {
            dispatch(changeCategory("Pending"));
        }
        else if (e.target.textContent === "Get finished tasks") {
            dispatch(changeCategory("Finished"));
        }
        else if (e.target.textContent === "Get all tasks") {
            dispatch(changeCategory("All"));
        }
    }

    return (
        <div className="todoInput-wrapper d-flex flex-column">
            <input
                className="form-control"
                type="text"
                placeholder="Add todo.."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                spellCheck= {false}
            />

            <div className="actions-wrapper d-flex justify-content-between mt-3">
                <button
                    onClick={insertTodo}
                    className="btn btn-primary"
                >
                    Add
                </button>

                <button
                    className="btn btn-warning"
                    onClick={updateCategory}
                >
                    Get pending tasks
                </button>

                <button
                    className="btn btn-success"
                    onClick={updateCategory}
                >
                    Get finished tasks
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={updateCategory}
                >
                    Get all tasks
                </button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default TodoInput;