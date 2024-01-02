import React, { useState } from "react";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const GroupLists = ({ todoArr, currentLocation }) => {
  const activeTasksId = useSelector((state) => state.active.activeTasks);

  const [categoryOpen, setCategoryOpen] = useState({
    blue: true,
    green: true,
    orange: true,
    purple: true,
    red: true,
    yellow: true,
    uncategorized: true,
  });

  const categoryOpenHandler = (category) => {
    setCategoryOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  
  const blueArr = todoArr.filter(
    (todo) => todo.category.includes("blue") && !todo.complete
  );
  const { lastTaskRef: lastBlueTaskRef, limitTodoArr: limitBlueArr } =
    useInfiniteScroll(20, blueArr);
  const blueContent = limitBlueArr.map((todo, index) => {
    if (limitBlueArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastBlueTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  const greenArr = todoArr.filter(
    (todo) => todo.category.includes("green") && !todo.complete
  );
  const { lastTaskRef: lastGreenTaskRef, limitTodoArr: limitGreenArr } =
    useInfiniteScroll(20, greenArr);
  const greenContent = limitGreenArr.map((todo, index) => {
    if (limitGreenArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastGreenTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  const orangeArr = todoArr.filter(
    (todo) => todo.category.includes("orange") && !todo.complete
  );
  const { lastTaskRef: lastOrangeTaskRef, limitTodoArr: limitOrangeArr } =
    useInfiniteScroll(20, orangeArr);
  const orangeContent = limitOrangeArr.map((todo, index) => {
    if (limitOrangeArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastOrangeTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  const purpleArr = todoArr.filter(
    (todo) => todo.category.includes("purple") && !todo.complete
  );
  const { lastTaskRef: lastPurpleTaskRef, limitTodoArr: limitPurpleArr } =
    useInfiniteScroll(20, purpleArr);
  const purpleContent = limitPurpleArr.map((todo, index) => {
    if (limitPurpleArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastPurpleTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });
  const redArr = todoArr.filter(
    (todo) => todo.category.includes("red") && !todo.complete
  );
  const { lastTaskRef: lastRedTaskRef, limitTodoArr: limitRedArr } =
    useInfiniteScroll(20, redArr);
  const redContent = limitRedArr.map((todo, index) => {
    if (limitRedArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastRedTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });
  const yellowArr = todoArr.filter(
    (todo) => todo.category.includes("yellow") && !todo.complete
  );
  const { lastTaskRef: lastYellowTaskRef, limitTodoArr: limitYellowArr } =
    useInfiniteScroll(20, yellowArr);
  const yellowContent = limitYellowArr.map((todo, index) => {
    if (limitYellowArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastYellowTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });
  const uncategorizedArr = todoArr.filter(
    (todo) => !todo.category.length && !todo.complete
  );
  const {
    lastTaskRef: lastUncategorizedTaskRef,
    limitTodoArr: limitUncategorizedArr,
  } = useInfiniteScroll(20, uncategorizedArr);
  const uncategorizedContent = limitUncategorizedArr.map((todo, index) => {
    if (limitUncategorizedArr.length === index + 1) {
      return (
        <TaskItem
          ref={lastUncategorizedTaskRef}
          key={todo.id}
          todo={todo}
          currentLocation={currentLocation}
          isTaskActive={activeTasksId.includes(todo.id)}
        />
      );
    }
    return (
      <TaskItem
        key={todo.id}
        todo={todo}
        currentLocation={currentLocation}
        isTaskActive={activeTasksId.includes(todo.id)}
      />
    );
  });

  const noIncomplete = todoArr.every((todo) => todo.complete === "");
  return (
    <div
      className="flex flex-col px-6"
      style={
        noIncomplete ? { paddingBottom: "1.5rem" } : { paddingBottom: "5px" }
      }
    >
      {/* {categoryCount.blue !== 0 && ( */}
      {blueArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.blue}
            headerOpenHandler={categoryOpenHandler}
            taskCount={blueArr.length}
            categoryName="blue"
          />
          {categoryOpen.blue && <div>{blueContent}</div>}
        </div>
      )}
      {greenArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.green}
            headerOpenHandler={categoryOpenHandler}
            taskCount={greenArr.length}
            categoryName="green"
          />
          {categoryOpen.green && <div>{greenContent}</div>}
        </div>
      )}
      {orangeArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.orange}
            headerOpenHandler={categoryOpenHandler}
            taskCount={orangeArr.length}
            categoryName="orange"
          />
          {categoryOpen.orange && <div>{orangeContent}</div>}
        </div>
      )}
      {purpleArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.purple}
            headerOpenHandler={categoryOpenHandler}
            taskCount={purpleArr.length}
            categoryName="purple"
          />
          {categoryOpen.purple && <div>{purpleContent}</div>}
        </div>
      )}
      {redArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.red}
            headerOpenHandler={categoryOpenHandler}
            taskCount={redArr.length}
            categoryName="red"
          />
          {categoryOpen.red && <div>{redContent}</div>}
        </div>
      )}
      {yellowArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.yellow}
            headerOpenHandler={categoryOpenHandler}
            taskCount={yellowArr.length}
            categoryName="yellow"
          />
          {categoryOpen.yellow && <div>{yellowContent}</div>}
        </div>
      )}

      {uncategorizedArr.length !== 0 && (
        <div>
          <TaskHeader
            isHeaderOpen={categoryOpen.uncategorized}
            headerOpenHandler={categoryOpenHandler}
            taskCount={uncategorizedArr.length}
            categoryName="uncategorized"
          />
          {categoryOpen.uncategorized && <div>{uncategorizedContent}</div>}
        </div>
      )}
    </div>
  );
};

export default React.memo(GroupLists);
