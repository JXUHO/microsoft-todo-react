import { useState } from "react";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";

const GroupLists = ({ todoArr, currentLocation }) => {
  const [categoryOpen, setCategoryOpen] = useState({
    blue: true,
    green: true,
    orange: true,
    purple: true,
    red: true,
    yellow: true,
    uncategorized: true
  });

  const categoryOpenHandler = (category) => {
    setCategoryOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  let categoryCount = {
    blue: 0,
    green: 0,
    orange: 0,
    purple: 0,
    red: 0,
    yellow: 0,
    uncategorized: 0
  };

  todoArr.forEach((todo) => {
    if (todo.category.length) {
      todo.category.forEach((color) => {
      if (!todo.complete) {
        categoryCount[color] = categoryCount[color] + 1;
      }
    });
    } else {
      if (!todo.complete) {
        categoryCount.uncategorized++
      }
    }
    
  });

  const noIncomplete = todoArr.every((todo) => todo.complete === "")
  return (
    <div className="flex flex-col px-6" style={noIncomplete ? {paddingBottom:"1.5rem"} : {paddingBottom:"5px", marginBottom:"-5px"}}>
      {categoryCount.blue !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.blue}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.blue}
            categoryName="blue"
          />
          {categoryOpen.blue && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("blue") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}
      {categoryCount.green !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.green}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.green}
            categoryName="green"
          />
          {categoryOpen.green && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("green") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}
      {categoryCount.orange !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.orange}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.orange}
            categoryName="orange"
          />
          {categoryOpen.orange && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("orange") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}
      {categoryCount.purple !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.purple}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.purple}
            categoryName="purple"
          />
          {categoryOpen.purple && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("purple") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}
      {categoryCount.red !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.red}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.red}
            categoryName="red"
          />
          {categoryOpen.red && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("red") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}
      {categoryCount.yellow !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.yellow}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.yellow}
            categoryName="yellow"
          />
          {categoryOpen.yellow && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (todo.category.includes("yellow") && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}


      {categoryCount.uncategorized !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.uncategorized}
            headerOpenHandler={categoryOpenHandler}
            taskCount={categoryCount.uncategorized}
            categoryName="uncategorized"
          />
          {categoryOpen.uncategorized && (
            <div>
              {todoArr
                .slice()
                .map((todo) => {
                  if (!todo.category.length && !todo.complete) {
                    return <TaskItem key={todo.id} todo={todo} />;
                  }
                })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default GroupLists;
