import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";
export const BoardView = ({ currentBoard, token, updateCurrentBoard }) => {
  const [showColumn, setShowColumn] = useState(false);
  const handleColumnClose = () => setShowColumn(false);
  const handleColumnShow = () => setShowColumn(true);

  const [showTask, setShowTask] = useState(false);
  const handleTaskClose = () => setShowTask(false);
  const handleTaskShow = () => setShowTask(true);

  const [columnName, setColumnName] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [taskDesctription, setTaskDesctription] = useState(null);

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
                <Modal.Title>Create Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Body>
                  <form
                    method="post"
                    className="form-signup"
                    onSubmit={handleTaskSubmit}
                  >
                    <div className="form-signup">
                      <label htmlFor="name">Name: </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                      />
                      <label htmlFor="name">Description: </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={taskDesctription}
                        onChange={(e) => setTaskDesctription(e.target.value)}
                        required
                      />
                      <label htmlFor="status">Status: </label>
                      <select id="status" name="status">
                        {currentBoard.Columns.map((column) => {
                          return (
                            <option value={column._id}>{column.Name}</option>
                          );
                        })}
                      </select>
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
