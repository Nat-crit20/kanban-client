import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Board.css";

import { useState } from "react";
export const BoardView = ({ currentBoard, token, updateCurrentBoard }) => {
  const [showColumn, setShowColumn] = useState(false);
  const handleColumnClose = () => setShowColumn(false);
  const handleColumnShow = () => setShowColumn(true);

  const [columnName, setColumnName] = useState(null);

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

  return (
    <>
      {currentBoard ? (
        <>
          <div>
            <Row className="column-home">
              {currentBoard &&
              currentBoard.Columns &&
              currentBoard.Columns.length > 0 ? (
                currentBoard.Columns.map((column) => {
                  return (
                    <Col>
                      <ColumnsView
                        column={column}
                        boardColumns={currentBoard.Columns}
                      />
                    </Col>
                  );
                })
              ) : (
                <p>This board is empty. Create a new column to get started.</p>
              )}
              <Col>
                <Button variant="secondary" onClick={handleColumnShow}>
                  Create Column
                </Button>
              </Col>
            </Row>
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
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
