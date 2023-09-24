import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNextRepeatDate, getNextRepeatMonth, getNextRepeatWeekWithOption, getNextRepeatYear } from "../components/date/getDates";
import uuid from "react-uuid";
import { addTodo, repeatedTodo } from "../store/todoSlice";


const useRepeatTasks = (tasksStored) => {
  const dispatch = useDispatch()

  useEffect(() => {
    tasksStored.forEach((taskItem) => {
      if (taskItem.repeatRule && taskItem.complete && !taskItem.repeated) {
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
      }
    });
  }, [dispatch, tasksStored]);
}


export default useRepeatTasks