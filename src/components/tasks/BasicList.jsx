import TaskItem from "./TaskItem";

const BasicList = ({ todoArr }) => {
  return (
    <div>
      {todoArr.slice().map((todo) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} />;
        }
      })}
    </div>
  );
};

export default BasicList;
