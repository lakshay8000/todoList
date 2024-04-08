import { useDispatch } from "react-redux";
import { useState } from "react";
import { editTodo, removeTodo, updateStatus } from "../../slices/todosSlice";
import "./todo.css";


function Todo({ id, title, serialNumber, status }) {
    const dispatch = useDispatch();

    // local states for edit todo functionalities-
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(title);

    // for edit todo functionality-
    function updateTodo() {
        if (!isEditing) {
            setIsEditing(true);
        }
        else if (isEditing) {
            dispatch(editTodo({ id: id, title: editedText, status : status }));
            setIsEditing(false);
        }
    }

    function handleStatusUpdate(e) {
        let statusToUpdate;
        if (e.target.textContent === "Finished") {
            statusToUpdate= "Finished";
        }
        else statusToUpdate= "Pending";
        dispatch(updateStatus({id, statusToUpdate}));
    }

    return (
        <div className="d-flex mb-3">
            <span className="serial-number pe-3">{serialNumber}</span>

            {isEditing ?
                <input
                    className="todo-task form-control pe-3"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    spellCheck= {false}
                />
                :
                <span className="todo-task pe-3"> {title} </span>
            }

            <span className="status pe-3">{status}</span>

            <div className="actions d-flex gap-3 pe-3">
                <button 
                    onClick={updateTodo}
                    className= {(isEditing) ? "btn btn-success" : "btn btn-warning"}
                > 
                    {(isEditing) ? "Save" : "Edit"} 
                </button>
                
                <button 
                    onClick={() => dispatch(removeTodo({ "id": id }))} 
                    className="btn btn-danger"
                > 
                    Delete 
                </button>

                <button
                    className="btn btn-success"
                    onClick= {handleStatusUpdate}
                >
                    {
                        (status === "Finished")?
                        "Undo Finished"
                        :
                        "Finished"
                    }
                </button>
            </div>

        </div>
    );
}

export default Todo;