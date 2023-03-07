import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import "./task.scss";

export const Task = ({ toDo, onPrint, onSetUpdateData, onDelete }) => {
    let index = 1;

    return (
        <>
            {toDo.map((task) => (
                <div className="tasks" key={task.id}>
                    <div className="task">
                        <div className="index">{index++}.</div>
                        <div className="title">{task.title}</div>
                        <div className="details">
                            <div className="name">{task.code}</div>
                            <div className="size">{task.size}</div>
                        </div>
                    </div>
                    <div className="icons-container">
                        {/* <span
                            onClick={() =>
                                onPrint(task.id, task.code, task.size)
                            }
                        >
                            <FaPrint className="complete" />
                        </span> */}
                        <span
                            className="edit"
                            onClick={() =>
                                onSetUpdateData({
                                    id: task.id,
                                    title: task.title,
                                    code: task.code,
                                    size: task.size,
                                })
                            }
                        >
                            {" "}
                            <FaEdit />
                        </span>
                        <span
                            onClick={() => onDelete(task.id)}
                            className="delete"
                        >
                            <FaTrash />
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
};
