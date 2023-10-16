import TaskItem from "./TaskItem";

const BasicList = ({ todoArr, currentLocation }) => {
  return (
    <>
      {todoArr.slice().map((todo) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
        }
      })}
    </>
  );
};

export default BasicList;
