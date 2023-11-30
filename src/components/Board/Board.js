import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
import Modal from "react-bootstrap/Modal";
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
          <div className="board-main-view">
            <div className="column-home">
              {currentBoard &&
              currentBoard.Columns &&
              currentBoard.Columns.length > 0 ? (
                <>
                  {currentBoard.Columns.map((column) => (
                    <div key={column.id} className="column-view">
                      <ColumnsView
                        key={column.id}
                        column={column}
                        boardColumns={currentBoard.Columns}
                      />
                    </div>
                  ))}
                  <div>
                    <button
                      className="create-column-btn"
                      onClick={handleColumnShow}
                    >
                      + Create Column
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-board">
                  <p>
                    This board is empty. Create a new column to get started.
                  </p>
                  <button
                    className="create-first-column-btn"
                    onClick={handleColumnShow}
                  >
                    + Add New Column
                  </button>
                </div>
              )}
            </div>
            <Modal show={showColumn} onHide={handleColumnClose} centered>
              <Modal.Body>
                <Modal.Body>
                  <h3>Add New Column</h3>
                  <form
                    method="post"
                    className="form-create-column"
                    onSubmit={handleColumnSubmit}
                  >
                    <label htmlFor="column-name">Name: </label>
                    <input
                      type="text"
                      name="column-name"
                      id="column-name"
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                      required
                    />

                    <input
                      className="form-submit"
                      // The style for this is in the HomeView.css
                      type="submit"
                      value="Create Column"
                    />
                  </form>
                </Modal.Body>
              </Modal.Body>
            </Modal>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
