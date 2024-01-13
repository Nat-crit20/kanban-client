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
    const fetchColumns = async () => {
      try {
        console.log(column._id);
        const response = await fetch(
          `https://obscure-river-59850-ea6dbafa2f33.herokuapp.com/column/${column._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`This is my data:`, data);
          setCurrentColumn(data);
        } else {
          console.error(`Error fetching data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchColumns();
  }, [column._id, token, setCurrentColumn]);

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
        console.log(data);
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
