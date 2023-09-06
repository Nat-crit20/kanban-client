import Button from "react-bootstrap/Button";
import { ColumnsView } from "../Columns/Columns";
export const BoardView = ({ currentBoard }) => {
  return (
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
  );
};
