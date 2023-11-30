import { BoardView } from "../Board/Board";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ButtonGroup } from "react-bootstrap";
import { ReactComponent as IconBoardSvg } from "../../assets/icon-board.svg";
import { ReactComponent as LogoForLight } from "../../assets/logo-dark.svg";
import { ReactComponent as LogoForDark } from "../../assets/logo-light.svg";
import { ReactComponent as IconCross } from "../../assets/icon-cross.svg";
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
  logout,
}) => {
  const [show, setShow] = useState(false);
  const [showSideBar, setShowSideBar] = useState("flex");
  const [boardName, setBoardName] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [taskDescription, setTaskDescription] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const taskStatus = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTask, setShowTask] = useState(false);
  const handleTaskClose = () => setShowTask(false);
  const handleTaskShow = () => setShowTask(true);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    console.log("click", dropdownOpen);
  };

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

  const handleDeleteBoard = () => {
    fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com//user/${user._id}/board/${currentBoard._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="board-header">
        <div className="logo">
          <LogoForLight />
        </div>
        <h1 className="board-title">{currentBoard ? currentBoard.Name : ""}</h1>
        <div className="board-info">
          {currentBoard &&
          currentBoard.Columns &&
          currentBoard.Columns.length > 0 ? (
            <div className="board-actions">
              <button className="addTask-btn" onClick={handleTaskShow}>
                + Add New Task
              </button>

              <VerticalEllipse
                className="vertical-ellipse"
                onClick={handleDropdownToggle}
              />

              <div
                className="dropdown-nav"
                style={{
                  display: dropdownOpen ? "block" : "none",
                }}
              >
                <p className="edit-board ">Edit Board</p>
                <p className="delete-board ">Delete Board</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="main-view">
        <div className="sidebar" style={{ display: showSideBar }}>
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
          <div className="sidebar-footer">
            <Form className="mode-switch">
              <LightModeSvg />
              <Form.Check type="switch" id="custom-switch" />
              <DarkModeSvg />
            </Form>
            <div className="hide-sidebar">
              <HideSidebarSvg onClick={() => setShowSideBar("none")} />
              <p>Hide Sidebar</p>
            </div>
            <div>
              <Button onClick={logout} variant="danger">
                Log Out
              </Button>
            </div>
          </div>
        </div>
        {showSideBar === "none" ? (
          <div>
            <button
              className="showSidebar-btn"
              onClick={() => setShowSideBar("flex")}
            >
              <ShowSidebarSvg />
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="board-view">
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
        </div>
      </div>
      <Modal id="create-board-modal" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <form
              method="post"
              className="create-board-form"
              onSubmit={handleSubmit}
            >
              <label className="board-name" htmlFor="board-name-input">
                Name{" "}
              </label>
              <input
                type="text"
                name="board-name-input"
                id="board-name-input"
                value={boardName}
                placeholder="e.g. Web Design"
                onChange={(e) => setBoardName(e.target.value)}
                required
              />

              <input
                className="form-submit"
                type="submit"
                value="Create New Board"
                onClick={handleClose}
              />
            </form>
          </Modal.Body>
        </Modal.Body>
      </Modal>
      <Modal
        id="create-task-modal"
        show={showTask}
        onHide={handleTaskClose}
        centered
      >
        <Modal.Body>
          <Modal.Body>
            <h3>Add New Task</h3>
            <form
              method="post"
              className="form-task"
              onSubmit={handleTaskSubmit}
            >
              <div className="form-create-task">
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
                <textarea
                  type="text"
                  name="description"
                  rows="4"
                  cols="5"
                  id="description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />

                <label htmlFor="subtask">Subtask: </label>
                {subtasks.map((subtask, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      className="create-subtask"
                      name="subtask"
                      id={`subtask_${i}`} // Add a unique id for each input
                      value={subtask.title}
                      onChange={(e) => {
                        const updatedSubtasks = [...subtasks]; // Create a copy of the subtasks array
                        updatedSubtasks[i] = { title: e.target.value }; // Update the specific subtask
                        setSubtasks(updatedSubtasks); // Update the state with the new array
                      }}
                      required
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
                      <IconCross />
                    </span>
                  </div>
                ))}
                <button
                  className="add-subtask"
                  onClick={() => {
                    const currentSubtasks = [...subtasks, {}];
                    setSubtasks(currentSubtasks);
                  }}
                >
                  + Add New Subtask
                </button>
                <label htmlFor="status">Status: </label>

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
              </div>

              <input
                className="form-submit"
                type="submit"
                value="Create New Task"
              />
            </form>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  );
};
