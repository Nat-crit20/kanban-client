import { useState, useEffect } from "react";
import { ReactComponent as VerticalEllipse } from "../../assets/icon-vertical-ellipsis.svg";
import { ReactComponent as IconCross } from "../../assets/icon-cross.svg";

import Modal from "react-bootstrap/Modal";
import "./Task.css";
export const TaskView = ({
  currentColumn,
  task,
  boardColumns,
  token,
  handleDeleteTask,
  updateCurrentBoard,
  currentBoard,
}) => {
  const [showTask, setShowTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showEditTask, setEditShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.Title);
  const [taskDescription, setTaskDescription] = useState(task.Description);
  const [subtasks, setSubtasks] = useState(task.SubTasks);
  const [taskStatus, setTaskStatus] = useState(currentColumn);
  const [shouldUpdateTask, setShouldUpdateTask] = useState(false);

  useEffect(() => {
    if (task._id !== currentTask._id) {
      setCurrentTask(task);
    }
  }, [task, currentTask]);

  useEffect(() => {
    if (shouldUpdateTask) {
      fetch(
        `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${currentColumn._id}/task/${task._id}`,
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
        .then((updatedTask) => {
          // Fetch the updated board data after the task is updated
          fetch(
            `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/board/${currentBoard._id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((updatedBoard) => {
              updateCurrentBoard(updatedBoard);
            })
            .catch((error) => {
              console.error("Error fetching updated board:", error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
      setShouldUpdateTask(false);
    }
  }, [
    currentTask,
    shouldUpdateTask,
    currentColumn._id,
    currentBoard._id,
    task,
    token,
    updateCurrentBoard,
  ]);

  const handleDropdownTask = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleTaskCloseAndUpdate = () => {
    setShouldUpdateTask(true);
    setShowTask(false);
  };
  const handleTaskClose = () => {
    setShowTask(false);
  };
  const handleEditTaskClose = () => {
    setShouldUpdateTask(false);
    setEditShowTask(false);
  };
  const handleEditTaskCloseAndUpdate = () => {
    setShouldUpdateTask(true);
    setEditShowTask(false);
  };
  const handleTaskShow = () => setShowTask(true);
  const handleDeleteTaskShow = () => {
    handleTaskClose();
    setShowDeleteTask(true);
  };
  const handleDeleteTaskClose = () => setShowDeleteTask(false);
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

  const handleEditColumnChange = (e) => {
    const changedColumnID = e.target.value;
    const changedColumn = boardColumns.filter((column) => {
      return column._id === changedColumnID;
    });
    setTaskStatus(changedColumn[0]);
  };

  const handleEditTaskSubmit = (e) => {
    e.preventDefault();
    setCurrentTask((prevInfo) => ({
      ...prevInfo,
      Title: taskName,
      Description: taskDescription,
      SubTasks: subtasks,
      Status: {
        columnID: taskStatus._id,
        name: taskStatus.Name,
      },
    }));
    handleEditTaskCloseAndUpdate();
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
      <Modal show={showTask} onHide={handleTaskCloseAndUpdate} centered>
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
                  <p className="delete-board " onClick={handleDeleteTaskShow}>
                    Delete Task
                  </p>
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
            <h3>Edit Task</h3>
            <form
              method="post"
              className="form-task"
              onSubmit={handleEditTaskSubmit}
            >
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
                    onChange={handleEditColumnChange}
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
                value="Save Changes"
              />
            </form>
          </Modal.Body>
        </Modal.Body>
      </Modal>
      <Modal
        id="delete-task"
        show={showDeleteTask}
        onHide={handleDeleteTaskClose}
        centered
      >
        <Modal.Body>
          <h3>Delete this Task?</h3>
          <p>
            Are you sure you want to delete the ‘{currentTask.Title}’ task and
            its subtasks? This action cannot be reversed.
          </p>
          <div className="delete-btn-actions">
            <button
              className="delete-task-btn"
              onClick={() => {
                handleDeleteTask();
                handleDeleteTaskClose();
              }}
            >
              Delete
            </button>
            <button className="cancel-task-btn" onClick={handleDeleteTaskClose}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
