import TaskItem from "./TaskItem";

const BasicList = ({ todoArr, currentLocation }) => {
  const noIncomplete = todoArr.every((todo) => todo.complete === "")
  return (
    <div className="flex flex-col overflow-y-auto px-6" style={noIncomplete ? {paddingBottom:"1.5rem"} : {paddingBottom:"5px", marginBottom:"-5px"}}>
      {todoArr.slice().map((todo) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
        }
      })}
    </div>
  );
};

export default BasicList;
