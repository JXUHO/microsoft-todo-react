import { forwardRef, useCallback, useRef, useState } from "react";
import TaskItemHeader from "../TaskItemHeader";
import { useDispatch, useSelector } from "react-redux";
import { openDetail } from "../../../store/uiSlice";
import { BsCircle, BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import {
  addActiveStep,
  addActiveTasks,
  initializeActiveTasks,
} from "../../../store/activeSlice";
import { completeStep } from "../../../store/todoSlice";

const SearchedSteps = ({ todoArr }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const openHandler = () => {
    setIsOpen((prevState) => !prevState);
  };
  
  const count = todoArr.length;
  
  const sortedArr = todoArr.sort((a, b) => {
    const contentA = a.step.content;
    const contentB = b.step.content;
    
    return contentA.localeCompare(contentB);
  });
  


  
  const [tasksToShow, setTasksToShow] = useState(20);

  const loadMoreTasks = () => {
    setTasksToShow((prevState) => prevState + 20);
  };

  const observerRef = useRef();

  const lastTaskRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && tasksToShow <= todoArr.length) {
          console.log("load more");
          loadMoreTasks();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [tasksToShow, todoArr.length]
  );

  const limitTodoArr = sortedArr.slice(0, tasksToShow);
  // [{todo:{...}, step:{...}}, {todo:{...}, step:{...}}]

  const content = limitTodoArr.map((todo, index) => {
    if (limitTodoArr.length === index + 1) {
      return (
        <StepItem
          ref={lastTaskRef}
          key={todo.step.id}
          todo={todo.todo}
          step={todo.step}
        />
      );
    }
    return <StepItem key={todo.step.id} todo={todo.todo} step={todo.step} />;
  });





  return (
    <>
      {count !== 0 && (
        <div className="px-6">
          <TaskItemHeader
            title="Steps"
            isOpen={isOpen}
            openHandler={openHandler}
            count={count}
          />
          {isOpen && <div>{content}</div>}
        </div>
      )}
    </>
  );
};

export default SearchedSteps;

const StepItem = forwardRef(({ todo, step }, ref) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.active.activeStep); //#eff6fc
  const showCompleted = useSelector((state) => state.search.showCompleted);

  const completedHandler = () => {
    dispatch(completeStep({ taskId: todo.id, stepId: step.id }));
  };

  const taskClickHandler = (taskId, stepId) => {
    dispatch(initializeActiveTasks());
    dispatch(openDetail());
    dispatch(addActiveStep(stepId));
    dispatch(addActiveTasks(taskId));
  };

  if (!showCompleted && step.complete) {
    return;
  }

  return (
    <>
      {
        <div
          ref={ref}
          className={`flex items-center mt-2 min-h-52 px-4 py-0 rounded animate-slideFadeDown100 ${
            isActive === step.id
              ? "bg-ms-active-blue"
              : "bg-white hover:bg-ms-white-hover"
          }`}
          style={{
            boxShadow:
              "0px 0.3px 0.9px rgba(0,0,0,0.1), 0px 1.6px 3.6px rgba(0,0,0,0.1)",
          }}
        >
          <span
            onClick={completedHandler}
            className="flex items-center justify-center w-8 h-8 hover:cursor-pointer"
          >
            {step.complete ? (
              <div className="animate-checkAnimationBase">
                <BsCheckCircleFill size="16px" style={{ color: "#2564cf" }} />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-100 z-20">
                  <BsCheckCircle size="16px" style={{ color: "#2564cf" }} />
                </div>
                <div className="z-10">
                  <BsCircle size="16px" style={{ color: "#2564cf" }} />
                </div>
              </div>
            )}
          </span>

          <button
            onClick={() => taskClickHandler(todo.id, step.id)}
            className="hover:cursor-pointer px-3 py-2 flex-1 text-left"
            style={{ color: "#292827" }}
          >
            <span
              style={step.complete ? { textDecoration: "line-through" } : null}
            >
              {step.content}
            </span>

            <span
              className="flex flex-wrap flex-row items-center leading-3"
              style={{ color: "#8c93a5" }}
            >
              {todo.task}
            </span>
          </button>
        </div>
      }
    </>
  );
});
