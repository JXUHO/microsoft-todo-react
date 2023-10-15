import TaskItem from "./TaskItem";

const BasicList = ({ todoArr }) => {
  return (
    <>
      {todoArr.slice().map((todo) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} />;
        }
      })}
    </>
  );
};

export default BasicList;
