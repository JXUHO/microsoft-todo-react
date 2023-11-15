import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import { BsCheck2, BsFillCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryTodo, removeCategoryTodo } from "../../store/todoSlice";
import DetailCategoryItems from "./DetailCategoryItems";
import useAuth from "../../hooks/useAuth";
import { useAddCategoryTodoApiMutation, useRemoveCategoryTodoApiMutation } from "../../api/todoApiSlice";

const DetailCategories = ({ taskId, todo, isApiData }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();

  // const todo = useSelector((state) =>
  //   state.todo.todos.find((todo) => todo.id === taskId)
  // );

  const { user, loading: isAuthLoading } = useAuth();
  const [addCategoryTodoApi] = useAddCategoryTodoApiMutation()
  const [removeCategoryTodoApi] = useRemoveCategoryTodoApiMutation()


  const categoryHandler = (category) => {
    if (!todo.category.includes(category)) {
      if (user) {
        addCategoryTodoApi({todoId:taskId, user, category})
      } else {
        dispatch(addCategoryTodo({ id: taskId, category }));
      }
    } else {
      if (user) {
        removeCategoryTodoApi({todoId:taskId, user, category})
      } else {
        dispatch(removeCategoryTodo({ id: taskId, category }));
      }
    }
  };

  const {
    refs: popoverRefs,
    floatingStyles: popoverFloatingStyles,
    context: popoverContext,
  } = useFloating({
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    middleware: [offset(5), flip(), shift({ padding: 10 })],
  });

  const {
    getReferenceProps: getPopoverReferenceProps,
    getFloatingProps: getPopoverFloatingProps,
  } = useInteractions([
    useClick(popoverContext),
    useDismiss(popoverContext),
  ]);

  return (
    <>
      <DetailCategoryItems
        taskId={taskId}
        popoverRefs={popoverRefs}
        getPopoverReferenceProps={getPopoverReferenceProps}
        categoryHandler={categoryHandler}
        todo={todo}
      />

      {popoverOpen && (
        <div
          ref={popoverRefs.setFloating}
          {...getPopoverFloatingProps()}
          style={{ ...popoverFloatingStyles, zIndex: 50 }}
        >
          <div
            className="bg-white py-1.5 rounded-sm min-w-[260px] max-w-[290px]"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
            }}
          >
            <ul className="text-black">
              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("blue")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("blue")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(224, 247, 253)"
                  style={{
                    padding: "1px",
                    background: "blue",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Blue category</span>
                {todo.category.includes("blue") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>

              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("green")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("green")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(233, 249, 232)"
                  style={{
                    padding: "1px",
                    background: "green",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Green category</span>
                {todo.category.includes("green") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>

              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("orange")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("orange")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(255, 241, 224)"
                  style={{
                    padding: "1px",
                    background: "orange",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Orange category</span>
                {todo.category.includes("orange") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>

              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("purple")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("purple")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(240, 236, 246)"
                  style={{
                    padding: "1px",
                    background: "purple",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Purple category</span>
                {todo.category.includes("purple") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>

              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("red")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("red")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(252, 233, 234)"
                  style={{
                    padding: "1px",
                    background: "red",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Red category</span>
                {todo.category.includes("red") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>

              <li
                className={`text-left min-h-[38px] flex relative items-center font-normal text-sm px-4 ${
                  todo.category.includes("yellow")
                    ? "bg-ms-white-hover"
                    : "hover:bg-ms-white-hover"
                }`}
                onClick={() => categoryHandler("yellow")}
              >
                <BsFillCircleFill
                  size="12px"
                  color="rgb(255, 253, 224)"
                  style={{
                    padding: "1px",
                    background: "gold",
                    borderRadius: "50%",
                  }}
                />
                <span className="text-left px-2">Yellow category</span>
                {todo.category.includes("yellow") && (
                  <span className="ml-auto">
                    <BsCheck2 />
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailCategories;
