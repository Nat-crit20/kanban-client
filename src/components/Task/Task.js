import { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./Task.css";
export const TaskView = ({ task, boardColumns }) => {
  const [showTask, setShowColumn] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const taskStatus = useRef();

  const handleTaskClose = () => setShowColumn(false);
  const handleTaskShow = () => setShowColumn(true);

  const handleCheckboxChange = (subtaskId) => {
    console.log("Before Update:", currentTask);
    setCurrentTask((prevInfo) => ({
      ...prevInfo,
      SubTasks: prevInfo.SubTasks.map((subtask) => {
        if (subtask._id === subtaskId) {
          return { ...subtask, isCompleted: !subtask.isCompleted };
        }
        return subtask;
      }),
    }));
    console.log("After Update:", currentTask);
  };

  const handleTaskUpdateSubmit = (e) => {
    e.preventDefault();
    const selectedOption = taskStatus.current;
    const selectedId = selectedOption.value;
    const columnName = boardColumns.filter((column) => {
      return column._id === selectedId;
    });
    // Need to finish the fetch for this
    setCurrentTask((prevInfo) => ({
      ...prevInfo,
      Status: {
        name: columnName[0].Name,
        columnID: columnName[0]._id,
      },
    }));
  };
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
          <Modal.Title>{currentTask.Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleTaskUpdateSubmit}>
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
            <select id="status" name="status" ref={taskStatus}>
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
