import { TaskView } from "../Task/Task";
export const ColumnsView = ({ column }) => {
  return (
    <>
      <h1>{column.Name}</h1>
      {column.Tasks.map((task) => {
        return <TaskView task={task} />;
      })}
    </>
  );
};
