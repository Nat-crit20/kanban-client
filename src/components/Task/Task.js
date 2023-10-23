import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
export const TaskView = ({ task }) => {
  const [showTask, setShowColumn] = useState(false);
  const handleTaskClose = () => setShowColumn(false);
  const handleTaskShow = () => setShowColumn(true);
  return (
    <>
      <div className="task-info" onClick={handleTaskShow}>
        <h3>{task.Title}</h3>
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
