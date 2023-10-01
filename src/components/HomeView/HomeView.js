import { BoardView } from "../Board/Board";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonGroup } from "react-bootstrap";
import { ReactComponent as IconBoardSvg } from "../../assets/icon-board.svg";
import { ReactComponent as LogoForLight } from "../../assets/logo-dark.svg";
import "./HomeView.css";
import { useState } from "react";

export const HomeView = ({
  user,
  token,
  currentBoard,
  updateUser,
  updateCurrentBoard,
  boards,
}) => {
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
        handleClose();
        updateUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCurrentBoard = (e) => {
    e.preventDefault();
    fetchBoard(e.target.id);
  };

  const fetchBoard = (id) => {
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/board/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        updateCurrentBoard(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container className="home-screen">
        <Row>
          <Col xs lg="2">
            <LogoForLight />
            <ButtonGroup vertical>
              {boards.map((board) => {
                return (
                  <Button
                    id={board._id}
                    onClick={handleCurrentBoard}
                    variant={
                      currentBoard && currentBoard._id === board._id
                        ? "primary"
                        : "secondary"
                    }
                  >
                    <IconBoardSvg />
                    {board.Name}
                  </Button>
                );
              })}
              <Button onClick={handleShow}>+ Create New Board</Button>
            </ButtonGroup>
          </Col>

          <Col>
            {currentBoard ? (
              <BoardView
                currentBoard={currentBoard}
                updateCurrentBoard={(board) => {
                  updateCurrentBoard(board);
                }}
                token={token}
              />
            ) : (
              <></>
            )}
          </Col>
        </Row>
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
      </Container>
    </>
  );
};
