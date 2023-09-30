import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDayOfWeek,
  getNextRepeatDate,
  getNextRepeatMonth,
  getNextRepeatWeekWithOption,
  getNextRepeatYear,
} from "../components/utils/getDates";
import uuid from "react-uuid";
import { addTodo, changeDueDateTodo, repeatedTodo } from "../store/todoSlice";

const useRepeatTasks = () => {
  const dispatch = useDispatch();

  const tasksStored = useSelector((state) => state.todo.todos);
  

  useEffect(() => {
    tasksStored.forEach((taskItem) => {
      if (taskItem.repeatRule && taskItem.complete && !taskItem.repeated) {  // repeat설정되었고, 완료됐고, 아직 반복 안됐으면
        const currentDueDate = new Date(taskItem.dueDate);
        let nextRepeatDate;
        let repeatRule = taskItem.repeatRule;
        switch (taskItem.repeatRule.split("-")[1]) {
          case "day":
            nextRepeatDate = getNextRepeatDate(
              currentDueDate,
              taskItem.repeatRule
            );
            break;
          case "week":
            nextRepeatDate = getNextRepeatWeekWithOption(
              currentDueDate,
              taskItem.repeatRule
            );
            break;
          case "month":
            const { nextRepeatMonth, newMonthRepeatRule } = getNextRepeatMonth(
              currentDueDate,
              taskItem.repeatRule
            );
            nextRepeatDate = nextRepeatMonth;
            repeatRule = newMonthRepeatRule;
            break;
          case "year":
            const { nextRepeatYear, newYearRepeatRule } = getNextRepeatYear(
              currentDueDate,
              taskItem.repeatRule
            );
            nextRepeatDate = nextRepeatYear;
            repeatRule = newYearRepeatRule;
            break;
          default:
            break;
        }
        const nextRepeatTask = {
          ...taskItem,
          complete: false,
          dueDate: nextRepeatDate.toISOString(),
          repeatRule: repeatRule,
          id: uuid(),
          created: new Date().toISOString(),
          repeated: false,
          // myday: isToday
        };
        dispatch(repeatedTodo(taskItem.id));
        dispatch(addTodo(nextRepeatTask));
      } else if (
        // week에서 선택한 요일과 due에 설정된 요일이 다를때, imperative하게 due를 변경
        taskItem.repeatRule &&
        !taskItem.complete &&
        !taskItem.repeated &&
        taskItem.repeatRule.split("-")[1] === 'week' &&  // 확인하기
        !taskItem.repeatRule
          .split("-")
          .slice(2)
          .includes(getDayOfWeek(new Date(taskItem.dueDate)))
      ) {
        const fixedDueDate = getNextRepeatWeekWithOption(
          new Date(taskItem.dueDate),
          taskItem.repeatRule
        );
        dispatch(changeDueDateTodo({id: taskItem.id, dueDate: fixedDueDate.toISOString()})) 
        // 여기서는 due를 repeat 옵션에 맞게 변경. 등록 후 사이드바에서 due를 변경할 때는 repeat 요일을 due에 맞게 변경.
        // 여러 요일 옵션이 선택된 경우에는, due를 설정한 요일을 해당 옵션에 더한다
      }
    });
  }, [dispatch, tasksStored]);
};

export default useRepeatTasks;
