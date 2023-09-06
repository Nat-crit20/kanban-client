import { BoardView } from "../Board/Board";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";
export const HomeView = ({ user, currentBoard, updateBoard }) => {
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Name: boardName,
    };
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/user/${user._id}/board`,
      {
        method: "POST",
        headers: {
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        {user.Board.forEach((board) => {
          <Button variant="primary">Board</Button>;
        })}
        <Button variant="primary" onClick={handleShow}>
          Create Board
        </Button>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Give the Board a name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              <form
                method="post"
                className="form-signup"
                onSubmit={handleSubmit}
              >
                <div className="form-signup">
                  <label htmlFor="name">Enter your username: </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <BoardView currentBoard={currentBoard} />
    </>
  );
};
