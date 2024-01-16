import { useState, useEffect } from "react";
import { TaskView } from "../Task/Task";
import { API } from "../../constants";
import "./Column.scss";

export const ColumnsView = ({
  column,
  boardColumns,
  token,
  updateCurrentBoard,
  currentBoard,
  colorMode,
}) => {
  const [currentColumn, setCurrentColumn] = useState(column);

  useEffect(() => {
    setCurrentColumn(column);
  }, [column]);

  const deleteTask = async (taskID) => {
    await fetch(`${API}/column/${currentColumn._id}/task/${taskID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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
      <h1 className={`column-name ${colorMode}`}>{currentColumn.Name}</h1>
      {currentColumn.Tasks.map((task) => {
        return (
          <TaskView
            key={task._id}
            updateCurrentBoard={updateCurrentBoard}
            currentColumn={currentColumn}
            token={token}
            task={task}
            currentBoard={currentBoard}
            boardColumns={boardColumns}
            colorMode={colorMode}
            handleDeleteTask={() => deleteTask(task._id)}
          />
        );
      })}
    </>
  );
};
