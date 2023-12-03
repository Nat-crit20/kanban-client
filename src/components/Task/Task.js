import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./Task.css";
export const TaskView = ({ currentColumn, task, boardColumns, token }) => {
  const [showTask, setShowColumn] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  const handleTaskClose = () => {
    handleTaskUpdate();
    setShowColumn(false);
  };
  const handleTaskShow = () => setShowColumn(true);

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
    console.log(currentColumn);
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
          <p>Number of subtask completed</p>
        </div>
      </div>
      <Modal show={showTask} onHide={handleTaskClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentTask.Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div>
              <p>{currentTask.Description}</p>
            </div>
            <div>
              <p>Subtasks:</p>
              {currentTask.SubTasks.map((subtask, i) => {
                return (
                  <div key={subtask._id}>
                    <input
                      type="checkbox"
                      id={`subtask-${subtask._id}`}
                      name={subtask._id}
                      checked={subtask.isCompleted}
                      onChange={() => handleCheckboxChange(subtask._id)}
                    />
                    <label htmlFor={`subtask-${subtask._id}`}>
                      {subtask.title}
                    </label>
                  </div>
                );
              })}
            </div>
            <p>Current Status</p>
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
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleTaskClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
