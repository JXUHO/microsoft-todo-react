import TaskItem from "./TaskItem";

const BasicList = ({ todoArr, currentLocation }) => {
  // repeatRule 설정된 task가 완료됐을 때는 render되지 않더라도 complete task가 존재함... scrollbar 생성되는 문제.. 해결할것.
  const noIncomplete = todoArr.every((todo) => todo.complete === "")
  return (
    <div className="flex flex-col px-6" style={noIncomplete ? {paddingBottom:"1.5rem"} : {paddingBottom:"5px", marginBottom:"-5px"}}>
      {todoArr.slice().map((todo) => {
        if (!todo.complete) {
          return <TaskItem key={todo.id} todo={todo} currentLocation={currentLocation}/>;
        }
      })}
    </div>
  );
};

export default BasicList;
