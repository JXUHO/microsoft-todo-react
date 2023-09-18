import Tippy, { tippy } from "@tippyjs/react";
import { useState } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// import RepeatItems from "./RepeatItems";

const RepeatPopover = () => {



  return (
    <>
      <Tippy
        content={<span>Repeat</span>}
        interactive={true}
        placement="bottom"
        theme="light"
        zIndex={20}
      >
        <Tippy
          trigger="click"
          placement="bottom"
          content={
            <div>
              <div>Repeat</div>
              <ul>
                <li>
                  <button onClick={null}>
                    <span>Daily</span>
                  </button>
                </li>
                <li>
                  <button onClick={null}>
                    <span>Weekdays</span>
                  </button>
                </li>
                <li>
                  <button onClick={null}>
                    <span>Weekly</span>
                  </button>
                </li>
                <li>
                  <button onClick={null}>
                    <span>Monthly</span>
                  </button>
                </li>
                <li>
                  <button onClick={null}>
                    <span>Yearly</span>
                  </button>
                </li>
                <li>----------------</li>
                <li>
                  <button onClick={customOpenHandler}>Custom</button>
                </li>
                {null && (
                  <li>
                    <button onClick={null}>Never repeat</button>
                  </li>
                )}
              </ul>
            </div>
          }
          theme="light"
          zIndex={10}
          interactive={true}
          // hideOnClick={true}
        >
          <button>Repeat</button>
        </Tippy>
      </Tippy>


        
    </>
  );
};

export default RepeatPopover;
