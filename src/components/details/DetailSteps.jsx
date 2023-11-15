import { useDispatch, useSelector } from "react-redux";
import { BsCheckCircle, BsCheckCircleFill, BsCircle, BsPlusLg } from "react-icons/bs";
import { TfiPlus } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { addStep } from "../../store/todoSlice";
import uuid from "react-uuid";
import DetailStepItem from "./DetailStepItem";
import { useAddStepApiMutation } from "../../api/todoApiSlice";
import useAuth from "../../hooks/useAuth";

const DetailSteps = ({ taskId, todo, isApiData }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const addRef = useRef();
  const [newStep, setNewStep] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  // const todo = useSelector((state) =>
  //   state.todo.todos.find((todo) => todo.id === taskId)
  // );
  const [addStepApi] = useAddStepApiMutation()
  const { user, loading: isAuthLoading } = useAuth();

  const inputHandler = (event) => {
    setNewStep(event.target.value);
  };

  const addStepHandler = () => {
    if (isApiData) {
      addStepApi({todoId: taskId, user, value: { id: uuid(), content: newStep, complete: false }})
    } else {
      dispatch(addStep({ id: taskId, step: { id: uuid(), content: newStep, complete: false } }));
    }
    setNewStep("");
  };

  const keyDownHandler = (event) => {
    if (!newStep) return;
    if (event.key === "Enter") {
      addRef.current.click();
    }
    if (event.key === "Escape") {
      setNewStep("");
    }
  };

  const focusHandler = () => {
    setIsFocused(true)
  }
  const blurHandler = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    if(isFocused) inputRef.current.focus()
  }, [isFocused])

  useEffect(() => {
    setNewStep("")
  }, [taskId])

  return (
    <div className="flex flex-col items-center bg-white rounded-b border-y-0">

      {todo.steps.map((step) => (
        <DetailStepItem key={step.id} step={step} taskId={taskId} isApiData={isApiData}/>
      ))}
            

      <div className="flex items-center bg-white w-full p-4">
        <div className="flex items-center cursor-pointer px-0.5 text-ms-blue">
          {isFocused ? (
          <BsCircle size="16px" />
          ) : (
            <button onClick={focusHandler}>
              <TfiPlus size="16px"  />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          className="px-4 placeholder:text-ms-blue dark:placeholder:text-ms-blue-hover focus:placeholder:text-gray-500"
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
          }}
          placeholder={todo.steps.length ? "Next step" : "Add step"}
          onChange={inputHandler}
          value={newStep}
          onKeyDown={keyDownHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        {newStep && (
          <button
            ref={addRef}
            className="pr-0.5 pl-1 h-5 w-auto text-xs font-semibold text-right"
            onClick={addStepHandler}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailSteps;
