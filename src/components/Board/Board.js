import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
import Modal from "react-bootstrap/Modal";

import { useRef, useState } from "react";
export const BoardView = ({ currentBoard, token, updateCurrentBoard }) => {
  const [showColumn, setShowColumn] = useState(false);
  const handleColumnClose = () => setShowColumn(false);
  const handleColumnShow = () => setShowColumn(true);

  const [showTask, setShowTask] = useState(false);
  const handleTaskClose = () => setShowTask(false);
  const handleTaskShow = () => setShowTask(true);

  const [columnName, setColumnName] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const taskStatus = useRef();

  const handleColumnSubmit = (e) => {
    e.preventDefault();

    const data = {
      Name: columnName,
    };

    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/board/${currentBoard._id}/column`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        updateCurrentBoard(data);
        handleColumnClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const selectedOption = taskStatus.current;
    const selectedId = selectedOption.value;
    const columnName = currentBoard.Columns.filter((column) => {
      return column._id === selectedId;
    });
    const data = {
      Name: taskName,
      Description: taskDescription,
      Status: { Name: columnName[0].Name, columnID: selectedId },
      SubTasks: subtasks,
    };
    console.log(data);
    /*
    fetch(`https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${taskStatus.current.value}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        updateCurrentBoard(data);
        handleColumnClose();
      })
      .catch((error) => {
        console.log(error);
      });
      */
  };
  return (
    <>
      {currentBoard ? (
        <>
          <div>
            <h1>{currentBoard.Name}</h1>
            <Button variant="primary" onClick={handleTaskShow}>
              Add New Task
            </Button>
          </div>
          <div>
            {currentBoard.Columns.map((column) => {
              return <ColumnsView column={column} />;
            })}
            <Button variant="primary" onClick={handleColumnShow}>
              Create Column
            </Button>

            <Modal show={showColumn} onHide={handleColumnClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Give the Column a name</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Body>
                  <form
                    method="post"
                    className="form-signup"
                    onSubmit={handleColumnSubmit}
                  >
                    <div className="form-signup">
                      <label htmlFor="name">Name: </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-signup">
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                </Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleColumnClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showTask} onHide={handleTaskClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Body>
                  <form
                    method="post"
                    className="form-signup"
                    onSubmit={handleTaskSubmit}
                  >
                    <div className="form-signup">
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
                      <input
                        type="text"
                        name="description"
                        id="description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                      />
                      <label htmlFor="subtask">Subtasks: </label>
                      <select id="status" name="status" ref={taskStatus}>
                        {currentBoard.Columns.map((column) => (
                          <option
                            key={column._id}
                            value={column._id}
                            data-name={column.Name} // Ensure this line sets the data-name attribute
                          >
                            {column.Name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="status">Status: </label>
                      {subtasks.map((subtask, i) => (
                        <div key={i}>
                          <input
                            type="text"
                            name="subtask"
                            id={`subtask_${i}`} // Add a unique id for each input
                            value={subtask}
                            onChange={(e) => {
                              const updatedSubtasks = [...subtasks]; // Create a copy of the subtasks array
                              updatedSubtasks[i] = e.target.value; // Update the specific subtask
                              setSubtasks(updatedSubtasks); // Update the state with the new array
                            }}
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
                            x
                          </span>
                        </div>
                      ))}
                      <Button
                        onClick={() => {
                          const currentSubtasks = [...subtasks, ""];
                          setSubtasks(currentSubtasks);
                        }}
                      >
                        + Add New Subtask
                      </Button>
                    </div>

                    <div className="form-signup">
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                </Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleTaskClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
