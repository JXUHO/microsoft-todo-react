import { useState } from "react";
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsCircle,
  BsXLg,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { completeStep, removeStep } from "../../store/todoSlice";

const DetailStepItem = ({ step, taskId }) => {
  const [isCheckHover, setIsCheckHover] = useState(false);
  const dispatch = useDispatch();

  const completeStepHandler = () => {
    dispatch(completeStep({ taskId, stepId: step.id }));
  };

  const removeStepHandler = () => {
    dispatch(removeStep({ taskId, stepId: step.id }));
  };

  //style={{borderBottom:"solid 0.5px #edebe9"}}

  return (
    <div className="flex flex-col w-full after:block after:content-[''] after:w-divider after:border-b after:ml-auto">
      <div className="flex items-center justify-between p-4 w-full bg-white hover:bg-ms-white-hover">
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

        
        <span className="w-full px-4" style={{ color: "#605E5C" }}>
          {step.content}
        </span>



        <button onClick={removeStepHandler}>
          <BsXLg size="16px" style={{ paddingRight: "2px" }} />
        </button>
      </div>
    </div>
  );
};

export default DetailStepItem;
