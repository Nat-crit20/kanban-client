import { TaskView } from "../Task/Task";
import "./Column.css";
export const ColumnsView = ({ column, boardColumns }) => {
  return (
    <>
      <h1 className="column-name">{column.Name}</h1>
      {column.Tasks.map((task) => {
        return <TaskView task={task} boardColumns={boardColumns} />;
      })}
    </>
  );
};
