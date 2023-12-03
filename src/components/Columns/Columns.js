import { TaskView } from "../Task/Task";
import "./Column.css";
export const ColumnsView = ({ column, boardColumns, token }) => {
  return (
    <>
      <h1 className="column-name">{column.Name}</h1>
      {column.Tasks.map((task) => {
        return <TaskView currentColumn={column} token={token} task={task} boardColumns={boardColumns} />;
      })}
    </>
  );
};
