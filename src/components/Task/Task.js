import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import "./Task.css";
export const TaskView = ({ task }) => {
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
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body></Modal.Body>
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
