import { BoardView } from "../Board/Board";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { ButtonGroup } from "react-bootstrap";
import { ReactComponent as IconBoardSvg } from "../../assets/icon-board.svg";
import { ReactComponent as LogoForLight } from "../../assets/logo-dark.svg";
import { ReactComponent as LogoForDark } from "../../assets/logo-light.svg";
import { ReactComponent as HideSidebarSvg } from "../../assets/icon-hide-sidebar.svg";
import { ReactComponent as ShowSidebarSvg } from "../../assets/icon-show-sidebar.svg";
import { ReactComponent as VerticalEllipse } from "../../assets/icon-vertical-ellipsis.svg";
import { ReactComponent as DarkModeSvg } from "../../assets/icon-dark-theme.svg";
import { ReactComponent as LightModeSvg } from "../../assets/icon-light-theme.svg";

import "./HomeView.css";
import { useRef, useState } from "react";

export const HomeView = ({
  user,
  token,
  currentBoard,
  updateUser,
  updateCurrentBoard,
  boards,
}) => {
  const [show, setShow] = useState(false);
  const [showSideBar, setShowSideBar] = useState("flex");
  const [boardName, setBoardName] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const taskStatus = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTask, setShowTask] = useState(false);
  const handleTaskClose = () => setShowTask(false);
  const handleTaskShow = () => setShowTask(true);

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

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const selectedOption = taskStatus.current;
    const selectedId = selectedOption.value;
    const columnName = currentBoard.Columns.filter((column) => {
      return column._id === selectedId;
    });
    const data = {
      Title: taskName,
      Description: taskDescription,
      Status: { name: columnName[0].Name, columnID: columnName[0]._id },
      SubTasks: subtasks,
    };

    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${columnName[0]._id}/task`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
        const columnIndex = currentBoard.Columns.findIndex(
          (column) => column._id === data._id
        );

        if (columnIndex !== -1) {
          // Create a shallow copy of boardState
          const updatedBoard = { ...currentBoard };
          // Replace the old column with the updated data
          updatedBoard.Columns[columnIndex] = data;
          // Update the board state with the new data
          updateCurrentBoard(updatedBoard);
        }

        handleTaskClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container className="home-screen m-0 p-0" fluid>
        <Row>
          <div className="board-header">
            <LogoForLight />
            <h1>{currentBoard ? currentBoard.Name : ""}</h1>
            {currentBoard &&
            currentBoard.Columns &&
            currentBoard.Columns.length > 0 ? (
              <div>
                <Button variant="primary" onClick={handleTaskShow}>
                  Add New Task
                </Button>
                <VerticalEllipse />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Row>
        <Row>
          <Col xs md={3} className="sidebar" style={{ display: showSideBar }}>
            <ButtonGroup vertical>
              <p className="sidebar-head">ALL BOARDS ({boards.length})</p>
              {boards.map((board) => {
                return (
                  <button
                    id={board._id}
                    onClick={handleCurrentBoard}
                    className={
                      currentBoard && currentBoard._id === board._id
                        ? "btn-active"
                        : "btn-non"
                    }
                  >
                    <IconBoardSvg
                      className={
                        currentBoard && currentBoard._id === board._id
                          ? "board-svg-active board-svg"
                          : "board-svg-non board-svg"
                      }
                    />
                    {board.Name}
                  </button>
                );
              })}
              <button className="btn-add-board" onClick={handleShow}>
                <IconBoardSvg className="create-board-svg board-svg" /> + Create
                New Board
              </button>
            </ButtonGroup>
            <div>
              <Form className="mode-switch">
                <LightModeSvg />
                <Form.Check type="switch" id="custom-switch" />
                <DarkModeSvg />
              </Form>
              <div className="hide-sidebar">
                <HideSidebarSvg onClick={() => setShowSideBar("none")} />
                <p>Hide Sidebar</p>
              </div>
            </div>
          </Col>
          {showSideBar === "none" ? (
            <div>
              <button onClick={() => setShowSideBar("flex")}>
                <ShowSidebarSvg />
              </button>
            </div>
          ) : (
            <></>
          )}

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
        <Modal show={showTask} onHide={handleTaskClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              <form
                method="post"
                className="form-task"
                onSubmit={handleTaskSubmit}
              >
                <div className="form-signup">
                  <label htmlFor="name">Title: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                  />
                  <label htmlFor="description">Description: </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                  <label htmlFor="subtask">Status: </label>

                  {currentBoard && currentBoard.Columns ? (
                    <select id="status" name="status" ref={taskStatus}>
                      {currentBoard.Columns.map((column) => (
                        <option
                          key={column._id}
                          value={column._id}
                          data-name={column.Name}
                        >
                          {column.Name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>Loading or no data available.</p>
                  )}
                  <label htmlFor="subtask">Subtask: </label>
                  {subtasks.map((subtask, i) => (
                    <div key={i}>
                      <input
                        type="text"
                        name="subtask"
                        id={`subtask_${i}`} // Add a unique id for each input
                        value={subtask.title}
                        onChange={(e) => {
                          const updatedSubtasks = [...subtasks]; // Create a copy of the subtasks array
                          updatedSubtasks[i] = { title: e.target.value }; // Update the specific subtask
                          setSubtasks(updatedSubtasks); // Update the state with the new array
                        }}
                      />
                      <span
                        onClick={() => {
                          const updatedSubtasks = subtasks.filter(
                            (subtask, j) => {
                              // Return true to keep the subtask, false to remove it
                              return i !== j; // Replace indexToRemove with the index you want to remove
                            }
                          );
                          setSubtasks(updatedSubtasks);
                        }}
                      >
                        x
                      </span>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const currentSubtasks = [...subtasks, {}];
                      setSubtasks(currentSubtasks);
                    }}
                  >
                    + Add New Subtask
                  </Button>
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
      </Container>
    </>
  );
};
