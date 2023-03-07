import "./todos.scss";
import { useState } from "react";
// import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../components/Task";
import * as XLSX from "xlsx";

import { Section } from "../../../Section";
import { useLocalStorageValue } from "../hooks/useLocalStorageValue";
import { RenderedPage } from "../../RenderedPage";

export const Todos = () => {
    const [toDo, setToDo] = useLocalStorageValue("Todos", []);

    const [newTask, setNewTask] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newSize, setNewSize] = useState("");
    const [updateData, setUpdateData] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() && newCode.trim() && newSize.trim()) {
            let taskId = uuidv4();
            let newEntry = {
                id: taskId,
                title: newTask.trim(),
                code: newCode.trim(),
                size: newSize.trim(),
            };
            setToDo([...toDo, newEntry]);
            setNewTask("");
            setNewCode("");
            setNewSize("");
        } else {
            alert("Please fill out all fields.");
        }
    };
    const deleteTask = (id) => {
        const confirmationText = window.prompt(
            "Type 'yes' to confirm deletion of this task:"
        );
        if (confirmationText === "yes") {
            let newTasks = toDo.filter((task) => task.id !== id);
            setToDo(newTasks);
        }
    };
    // const printOn = (id, code, size) => {
    //     if (code && size) {
    //         const renderedPageUrl = `${
    //             window.location.origin
    //         }/rendered-page?code=${encodeURIComponent(
    //             code
    //         )}&size=${encodeURIComponent(size)}`;
    //         window.open(renderedPageUrl, "_blank");
    //     }
    // };
    const cancelUpdate = () => {
        setUpdateData("");
    };
    const changeTask = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (value.trim() === "") {
            alert("Please enter a non-empty value.");
            return;
        }

        if (name === "size") {
            value = value.toUpperCase();
        }
        setUpdateData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateTask = () => {
        if (
            updateData.title.trim() === "" ||
            updateData.code.trim() === "" ||
            updateData.size.trim() === ""
        ) {
            alert("Please fill out all fields.");
            return;
        }

        let filterRecords = [...toDo].filter(
            (task) => task.id !== updateData.id
        );
        let updatedObject = [...filterRecords, updateData];
        setToDo(updatedObject);
        setUpdateData("");
    };
    const exportToExcel = () => {
        /* create a new workbook */
        const wb = XLSX.utils.book_new();
        /* convert your data to an array of arrays */
        const data = [
            ["Title", "Code", "Size"],
            ...toDo.map((task) => [
                task.title.trim(),
                task.code.trim(),
                task.size.trim(),
            ]),
        ];
        /* create a new worksheet and add your data to it */
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        /* save the workbook as a file */
        XLSX.writeFile(wb, "todos.xlsx");
    };
    const deleteAllTasks = () => {
        const confirmationText = window.prompt(
            "Type 'yes' to confirm deletion of all tasks:"
        );
        if (confirmationText === "yes") {
            setToDo([]);
            localStorage.removeItem("Todos");
        }
    };

    return (
        <Section>
            <div className="task-container">
                <h1>Todo App</h1>

                {updateData && updateData ? (
                    <form className="form-todo">
                        <input
                            name="title"
                            type={"text"}
                            value={updateData && updateData.title}
                            onChange={(e) => changeTask(e)}
                            className="input"
                        />
                        <input
                            name="code"
                            type="text"
                            value={updateData && updateData.code}
                            onChange={(e) => changeTask(e)}
                            className="input"
                        />
                        <input
                            name="size"
                            type="text"
                            value={updateData && updateData.size}
                            onChange={(e) => changeTask(e)}
                            className="input"
                        />

                        <div className="input-btns">
                            <button
                                className="input-btn success "
                                onClick={updateTask}
                            >
                                Update
                            </button>
                            <button
                                className="input-btn warning"
                                onClick={cancelUpdate}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="form-todo">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="input"
                        />
                        <input
                            type="number"
                            name="code"
                            value={newCode}
                            onChange={(e) => {
                                let inputValue = e.target.value;
                                if (inputValue.length <= 5) {
                                    inputValue = parseInt(inputValue, 10)
                                        .toString()
                                        .slice(0, 5);
                                    setNewCode(inputValue);
                                }
                            }}
                            className="input"
                        />
                        <input
                            type="text"
                            value={newSize}
                            onChange={(e) =>
                                setNewSize(
                                    (e.target.value =
                                        e.target.value.toUpperCase())
                                )
                            }
                            className="input"
                        />

                        <div className="input-btns">
                            <button
                                className="input-btn success"
                                onClick={addTask}
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                )}
                {toDo && toDo.length ? "" : "No products..."}
            </div>

            <Task
                toDo={toDo}
                // onPrint={printOn}
                onSetUpdateData={setUpdateData}
                onDelete={deleteTask}
                renderTask={(task) => (
                    <RenderedPage code={task.code} size={task.size} />
                )}
            />
            <div className=" footer-buttons">
                <button className="delete-all" onClick={deleteAllTasks}>
                    Delete all Products
                </button>
                <button className="excel-button" onClick={exportToExcel}>
                    Export to Excel
                </button>
            </div>
        </Section>
    );
};
