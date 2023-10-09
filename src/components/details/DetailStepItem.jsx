import { useState } from "react";
import { BsCheckCircle, BsCheckCircleFill, BsCircle, BsXLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { completeStep, removeStep } from "../../store/todoSlice";



const DetailStepItem = ({ step, taskId }) => {
  const [isCheckHover, setIsCheckHover] = useState(false);
  const dispatch = useDispatch()

  const completeStepHandler = () => {
    dispatch(completeStep({taskId, stepId: step.id}))
  }

  const removeStepHandler = () => {
    dispatch(removeStep({taskId, stepId: step.id}))
  }

  return (
    <div
      className="flex flex-1 items-center justify-between p-4 w-full bg-white hover:bg-ms-white-hover"
    >
      <span
        className="flex items-center justify-center hover:cursor-pointer px-0.5"
        onClick={completeStepHandler}
        onMouseEnter={() => setIsCheckHover(true)}
        onMouseLeave={() => setIsCheckHover(false)}
      >
        {step.complete ? (
          <BsCheckCircleFill size="16px" style={{ color: "#2564cf" }} />
        ) : isCheckHover ? (
          <BsCheckCircle size="16px" style={{ color: "#2564cf" }} />
        ) : (
          <BsCircle size="16px" style={{ color: "#2564cf" }} />
        )}
      </span>
      <span className="w-full px-4">{step.content}</span>
      <button onClick={removeStepHandler}><BsXLg size='16px' style={{paddingRight:"2px"}}/></button>
    </div>
  );
};

export default DetailStepItem;
