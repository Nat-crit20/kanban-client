import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./Task.css";
export const TaskView = ({ task, boardColumns }) => {
  const [showTask, setShowColumn] = useState(false);
  const handleTaskClose = () => setShowColumn(false);
  const handleTaskShow = () => setShowColumn(true);
  return (
    <>
      <div id="task-info" onClick={handleTaskShow}>
        <div className="task-info-text">
          <h3>{task.Title}</h3>
          <p>Number of subtask completed</p>
        </div>
      </div>
      <Modal show={showTask} onHide={handleTaskClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{task.Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <p>{task.Description}</p>
          </div>
          <div>
            <p>Subtasks:</p>
            {task.SubTasks.map((subtask, i) => {
              if (subtask.isComplete) {
                return (
                  <div>
                    <input
                      type="checkbox"
                      id="subtask"
                      name={`subtask-${i}`}
                      checked
                    />
                    <label for={`subtask-${i}`}>{subtask.title}</label>
                  </div>
                );
              } else {
                return (
                  <div>
                    <input type="checkbox" id="subtask" name={`subtask-${i}`} />
                    <label for={`subtask-${i}`}>{subtask.title}</label>
                  </div>
                );
              }
            })}
          </div>
          <p>Current Status</p>
          <select id="status" name="status">
            {boardColumns.map((column) => {
              if (task.Status.columnID === column._id) {
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
