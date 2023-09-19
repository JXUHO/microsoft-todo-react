import Tippy, { tippy } from "@tippyjs/react";
import { useState } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// import RepeatItems from "./RepeatItems";

const RepeatPopover = () => {


  const instance = tippy(document.querySelector('button'));
  
  


  const customOpenHandler = () => {
    console.log(document.getElementById("repeatButton"));
    console.log(instance);
 
  };

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



      <Tippy
        theme="light"
        interactive={true}
        placement="bottom"
        zIndex={30}
        trigger="manual"
        // triggerTarget={customButton}
        content={<h1>custom</h1>}
      >
        <button>test</button>
      </Tippy>

        
    </>
  );
};

export default RepeatPopover;



/**
 * TODO
 * 
 * Tippy custom버튼 누르면 기존 tippy 닫히고 custom tippy 열려야함.
 * trigger manual - method로 해결해야할 것 같은데 아직 모르겠음.
 * 
 * 
 * 
 * 
 * 
 */