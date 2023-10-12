import { BsFillCircleFill } from "react-icons/bs";

const TaskItemCategories = ({ todo }) => {
  return (
    <>
      {todo.category.length !== 0 && <span className="before:content-['\2022'] before:mx-1.5 before:my-0 before:text-gray-500"/>}
      {todo.category.includes("blue") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#007899" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(224, 247, 253)"
                style={{
                  padding: "1px",
                  background: "blue",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Blue category</span>
            </div>
          </span>
        </div>
      )}
      {todo.category.includes("green") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#257E20" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(233, 249, 232)"
                style={{
                  padding: "1px",
                  background: "green",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Green category</span>
            </div>
          </span>
        </div>
      )}
      {todo.category.includes("orange") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#A35A00" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(255, 241, 224)"
                style={{
                  padding: "1px",
                  background: "orange",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Orange category</span>
            </div>
          </span>
        </div>
      )}
      {todo.category.includes("purple") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#7D57B2" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(240, 236, 246)"
                style={{
                  padding: "1px",
                  background: "purple",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Purple category</span>
            </div>
          </span>
        </div>
      )}
      {todo.category.includes("red") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#D01B2A" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(252, 233, 234)"
                style={{
                  padding: "1px",
                  background: "red",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Red category</span>
            </div>
          </span>
        </div>
      )}
      {todo.category.includes("yellow") && (
        <div className="flex items-center ">
          <span className="text-xs mr-1" style={{ color: "#7A7400" }}>
            <div className="text-left flex relative items-center font-normalpx-4">
              <BsFillCircleFill
                size="10px"
                color="rgb(255, 253, 224)"
                style={{
                  padding: "1px",
                  background: "yellow",
                  borderRadius: "50%",
                }}
              />
              <span className="text-left px-1">Yellow category</span>
            </div>
          </span>
        </div>
      )}


    </>
  );
};

export default TaskItemCategories;
