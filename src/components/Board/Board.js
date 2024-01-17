import { useState, useEffect } from "react";
import { ColumnsView } from "../Columns/Columns";
import Modal from "react-bootstrap/Modal";
import { API } from "../../constants";
import "./Board.scss";

export const BoardView = ({
  currentBoard,
  token,
  updateCurrentBoard,
  colorMode,
}) => {
  const [showColumn, setShowColumn] = useState(false);
  const [currentBoardColumns, setCurrentBoardColumns] = useState(
    currentBoard.Columns
  );

  useEffect(() => {
    // Update currentBoardColumns when currentBoard.Columns changes
    setCurrentBoardColumns(currentBoard.Columns);
  }, [currentBoard.Columns]);

  //Create column modal
  const handleColumnClose = () => setShowColumn(false);
  const handleColumnShow = () => setShowColumn(true);

  const [columnName, setColumnName] = useState(null);

  const handleColumnSubmit = (e) => {
    e.preventDefault();

    const data = {
      Name: columnName,
    };

    fetch(`${API}/board/${currentBoard._id}/column`, {
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
                    <div key={column._id} className="column-view">
                      <ColumnsView
                        key={column._id}
                        column={column}
                        token={token}
                        currentBoard={currentBoard}
                        updateCurrentBoard={updateCurrentBoard}
                        boardColumns={currentBoardColumns}
                        colorMode={colorMode}
                      />
                    </div>
                  ))}
                  <div className={` ${colorMode}`}>
                    <button
                      className={`create-column-btn`}
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
            <Modal
              className={`${colorMode} create-column`}
              show={showColumn}
              onHide={handleColumnClose}
              centered
            >
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
