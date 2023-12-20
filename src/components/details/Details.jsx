import { useSelector } from "react-redux";
import DetailHeader from "./DetailHeader";
import DetailSteps from "./DetailSteps";
import DetailOptions from "./DetailOptions";
import DetailCategories from "./DetailCategories";
import DetailAddFile from "./DetailAddFile";
import DetailNote from "./DetailNote";
import getLastTimeOfDay, {
  getNextClosestDayOfWeekFromDate,
} from "../../utils/getDates";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useChangeOptionTodoApiMutation } from "../../api/todoApiSlice";

const Details = ({ taskId, todos }) => {
  const location = useLocation();
  const todo = todos.find((todo) => todo.id === taskId);
  const user = useSelector(state => state.auth.user)
  const [changeOptionTodoApi] = useChangeOptionTodoApiMutation();

  
  useEffect(() => {
    // due 제거되면 repeat도 제거
    if (!todo) return;
    if (!todo.dueDate && todo.repeatRule) {

        changeOptionTodoApi({
          todoId: taskId,
          user,
          option: "repeatRule",
          content: "",
          currentLocation: location.pathname,
        });

    }
  }, [todo?.dueDate]);

  useEffect(() => {
    // repeat설정했을때, due버튼 설정
    if (!todo) return;
    if (todo.repeatRule && !todo.dueDate) {
      if (todo.repeatRule.split("-").length === 2) {
        // due를 getLastTimeOfDay()로 설정

          changeOptionTodoApi({
            todoId: taskId,
            user,
            option: "dueDate",
            content: getLastTimeOfDay().toISOString(),
            currentLocation: location.pathname,
          });

      } else {
        const today = new Date();

          changeOptionTodoApi({
            todoId: taskId,
            user,
            option: "dueDate",
            content: getNextClosestDayOfWeekFromDate(
              today,
              todo.repeatRule.split("-").slice(2)
            ).toISOString(),
            currentLocation: location.pathname,
          });

      }
    }
  }, [todo?.repeatRule]);
  
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto py-0 pr-4 pl-6 mt-4 h-20">
      <DetailHeader taskId={taskId} todo={todo} />
      <DetailSteps taskId={taskId} todo={todo} />
      <DetailOptions taskId={taskId} todo={todo} />
      <DetailCategories taskId={taskId} todo={todo} />
      <DetailAddFile taskId={taskId} todo={todo} />
      <DetailNote taskId={taskId} todo={todo} />
    </div>
  );
};

export default Details;

/**
 * TODO
 * - scrollable div 구현하기
 *
*/

// useEffect(() => {
//   // due 제거되면 repeat도 제거
//   if (!todo.dueDate && todo.repeatRule) {
//     if (user) {
//       changeOptionTodoApi({
//         todoId: taskId,
//         user,
//         option: "repeatRule",
//         content: "",
//         currentLocation: location.pathname,
//       });
//     } else {
//       dispatch(
//         changeOptionTodo({
//           id: taskId,
//           option: "repeatRule",
//           content: "",
//           currentLocation: location.pathname,
//         })
//       );
//     }
//   }
// }, [todo.dueDate]);

// useEffect(() => {
//   // repeat설정했을때, due버튼 설정
//   if (todo.repeatRule && !todo.dueDate) {
//     if (todo.repeatRule.split("-").length === 2) {
//       // due를 getLastTimeOfDay()로 설정
//       if (user) {
//         changeOptionTodoApi({
//           todoId: taskId,
//           user,
//           option: "dueDate",
//           content: getLastTimeOfDay().toISOString(),
//           currentLocation: location.pathname,
//         });
//       } else {
//         dispatch(
//           changeOptionTodo({
//             id: taskId,
//             option: "dueDate",
//             content: getLastTimeOfDay().toISOString(),
//             currentLocation: location.pathname,
//           })
//         );
//       }
//     } else {
//       const today = new Date();
//       if (user) {
//         changeOptionTodoApi({
//           todoId: taskId,
//           user,
//           option: "dueDate",
//           content: getNextClosestDayOfWeekFromDate(
//             today,
//             todo.repeatRule.split("-").slice(2)
//           ).toISOString(),
//           currentLocation: location.pathname,
//         });
//       } else {
//         dispatch(
//           changeOptionTodo({
//             id: taskId,
//             option: "dueDate",
//             content: getNextClosestDayOfWeekFromDate(
//               today,
//               todo.repeatRule.split("-").slice(2)
//             ).toISOString(),
//             currentLocation: location.pathname,
//           })
//         );
//       }
//     }
//   }
// }, [todo.repeatRule]);