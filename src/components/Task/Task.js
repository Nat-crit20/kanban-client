import { useState } from "react";
import { ReactComponent as VerticalEllipse } from "../../assets/icon-vertical-ellipsis.svg";
import { ReactComponent as IconCross } from "../../assets/icon-cross.svg";

import Modal from "react-bootstrap/Modal";
import "./Task.css";
export const TaskView = ({ currentColumn, task, boardColumns, token }) => {
  const [showTask, setShowTask] = useState(false);
  const [showEditTask, setEditShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [taskName, setTaskName] = useState(currentTask.Title);
  const [taskDescription, setTaskDescription] = useState(
    currentTask.Description
  );
  const [subtasks, setSubtasks] = useState(currentTask.SubTasks);

  const handleDropdownTask = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleTaskClose = () => {
    handleTaskUpdate();
    setShowTask(false);
  };
  const handleEditTaskClose = () => {
    setEditShowTask(false);
  };
  const handleTaskShow = () => setShowTask(true);
  const handleEditTaskShow = () => {
    handleTaskClose();
    setEditShowTask(true);
  };

  const handleCheckboxChange = (subtaskId) => {
    setCurrentTask((prevInfo) => ({
      ...prevInfo,
      SubTasks: prevInfo.SubTasks.map((subtask) => {
        if (subtask._id === subtaskId) {
          return { ...subtask, isCompleted: !subtask.isCompleted };
        }
        return subtask;
      }),
    }));
  };

  const handleColumnChange = (e) => {
    const changedColumnID = e.target.value;
    const changedColumn = boardColumns.filter((column) => {
      return column._id === changedColumnID;
    });
    setCurrentTask((prevInfo) => ({
      ...prevInfo,
      Status: {
        name: changedColumn[0].Name,
        columnID: changedColumn[0]._id,
      },
    }));
  };

  const handleTaskUpdate = () => {
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${currentColumn._id}/task/${currentTask._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTask),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log("after fetch");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="task-info" onClick={handleTaskShow}>
        <div className="task-info-text">
          <h3>{currentTask.Title}</h3>
          <p>
            {
              currentTask.SubTasks.filter((subtask) => subtask.isCompleted)
                .length
            }{" "}
            of {currentTask.SubTasks.length} subtasks{" "}
          </p>
        </div>
      </div>
      <Modal show={showTask} onHide={handleTaskClose} centered>
        <Modal.Body>
          <div className="modify-task">
            <div className="modify-task-header">
              <h4>{currentTask.Title}</h4>
              <div>
                <VerticalEllipse
                  className="vertical-ellipse"
                  onClick={handleDropdownTask}
                />
                <div
                  className="dropdown-task"
                  style={{
                    display: dropdownOpen ? "block" : "none",
                  }}
                >
                  <p className="edit-board " onClick={handleEditTaskShow}>
                    Edit Task
                  </p>
                  <p className="delete-board ">Delete Task</p>
                </div>
              </div>
            </div>

            <form id="modify-task-form">
              <div>
                <p>{currentTask.Description}</p>
              </div>
              <div>
                <p className="modify-task-section">
                  Subtasks{" "}
                  {
                    currentTask.SubTasks.filter(
                      (subtask) => subtask.isCompleted
                    ).length
                  }{" "}
                  of {currentTask.SubTasks.length} :
                </p>
                {currentTask.SubTasks.map((subtask, i) => {
                  return (
                    <div className="task-checkbox-container" key={subtask._id}>
                      <input
                        type="checkbox"
                        id={`subtask-${subtask._id}`}
                        name={subtask._id}
                        className="task-checkbox"
                        checked={subtask.isCompleted}
                        onChange={() => handleCheckboxChange(subtask._id)}
                      />
                      <label
                        htmlFor={`subtask-${subtask._id}`}
                        style={{
                          textDecoration: subtask.isCompleted
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {subtask.title}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="modify-task-section">Current Status</p>
              {currentColumn && boardColumns ? (
                <select id="status" name="status" onChange={handleColumnChange}>
                  {boardColumns.map((column) => {
                    if (currentTask.Status.columnID === column._id) {
                      return (
                        <option
                          key={column._id}
                          value={column._id}
                          data-name={column.Name}
                          selected
                        >
                          {column.Name}
                        </option>
                      );
                    } else {
                      return (
                        <option
                          key={column._id}
                          value={column._id}
                          data-name={column.Name}
                        >
                          {column.Name}
                        </option>
                      );
                    }
                  })}
                </select>
              ) : (
                <p>Loading or no data available.</p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        id="create-task-modal"
        show={showEditTask}
        onHide={handleEditTaskClose}
        centered
      >
        <Modal.Body>
          <Modal.Body>
            <h3>Add New Task</h3>
            <form method="post" className="form-task">
              <div className="form-create-task">
                <label htmlFor="name">Title: </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
                <label htmlFor="description">Description: </label>
                <textarea
                  type="text"
                  name="description"
                  rows="4"
                  cols="5"
                  id="description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />

                <label htmlFor="subtask">Subtask: </label>
                {subtasks.map((subtask, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      className="create-subtask"
                      name="subtask"
                      id={`subtask_${i}`} // Add a unique id for each input
                      value={subtask.title}
                      onChange={(e) => {
                        const updatedSubtasks = [...subtasks]; // Create a copy of the subtasks array
                        updatedSubtasks[i] = { title: e.target.value }; // Update the specific subtask
                        setSubtasks(updatedSubtasks); // Update the state with the new array
                      }}
                      required
                    />
                    <span
                      onClick={() => {
                        const updatedSubtasks = subtasks.filter(
                          (subtask, j) => {
                            // Return true to keep the subtask, false to remove it
                            return i !== j; // Replace indexToRemove with the index you want to remove
                          }
                        );
                        setSubtasks(updatedSubtasks);
                      }}
                    >
                      <IconCross />
                    </span>
                  </div>
                ))}
                <button
                  className="add-subtask"
                  onClick={() => {
                    const currentSubtasks = [...subtasks, {}];
                    setSubtasks(currentSubtasks);
                  }}
                >
                  + Add New Subtask
                </button>
                <label htmlFor="status">Status: </label>

                {boardColumns ? (
                  <select
                    id="status"
                    name="status"
                    onChange={handleColumnChange}
                  >
                    {boardColumns.map((column) => {
                      if (currentTask.Status.columnID === column._id) {
                        return (
                          <option
                            key={column._id}
                            value={column._id}
                            data-name={column.Name}
                            selected
                          >
                            {column.Name}
                          </option>
                        );
                      } else {
                        return (
                          <option
                            key={column._id}
                            value={column._id}
                            data-name={column.Name}
                          >
                            {column.Name}
                          </option>
                        );
                      }
                    })}
                  </select>
                ) : (
                  <p>Loading or no data available.</p>
                )}
              </div>

              <input
                className="form-submit"
                type="submit"
                value="Create New Task"
              />
            </form>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  );
};
