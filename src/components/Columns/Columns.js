import { useState, useEffect } from "react";
import { TaskView } from "../Task/Task";
import "./Column.css";

export const ColumnsView = ({
  column,
  boardColumns,
  token,
  updateCurrentBoard,
  currentBoard,
}) => {
  const [currentColumn, setCurrentColumn] = useState(column);

  useEffect(() => {
    setCurrentColumn(column);
  }, [column]);

  const deleteTask = async (taskID) => {
    await fetch(
      `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${currentColumn._id}/task/${taskID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setCurrentColumn(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="column-name">{currentColumn.Name}</h1>
      {currentColumn.Tasks.map((task) => {
        return (
          <TaskView
            updateCurrentBoard={updateCurrentBoard}
            currentColumn={currentColumn}
            token={token}
            task={task}
            currentBoard={currentBoard}
            boardColumns={boardColumns}
            handleDeleteTask={() => deleteTask(task._id)}
          />
        );
      })}
    </>
  );
};
