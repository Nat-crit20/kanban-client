import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
import { useEffect } from "react";
export const BoardView = ({ currentBoard }) => {
  useEffect(() => {}, [currentBoard]);
  return (
    <>
      {currentBoard ? (
        <>
          <div>
            <h1>{currentBoard.Name}</h1>
            <Button>Add New Task</Button>
          </div>
          <div>
            {currentBoard.Columns.map((column) => {
              return <ColumnsView />;
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
