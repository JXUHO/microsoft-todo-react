import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import { createPortal } from "react-dom";
import { Popper } from "react-popper";

function isInDOMSubtree(element, subtreeRoot) {
  return (
    subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element))
  );
}

const PopperWrapper = forwardRef(
  ({ target, children, toggle, initOpen, ...props }, ref) => {
    const [isVisible, setVisibility] = useState(initOpen || false);
    const [targetElementIsVisible, setTargetElementIsVisible] = useState(false);

    const toggleVisibility = () =>
      setVisibility(prevVisibility => !prevVisibility);

    const elRef = useRef(document.getElementById(target));
    const popperRef = useRef(null);

    useImperativeHandle(ref, () => ({
      setVisibility: (input) => setVisibility(input),
    }));

    const legacyClick = e => {
      if (e.target === elRef.current || elRef.current.contains(e.target)) {  // 클릭이 발생한 곳과 target의 element가 같으면 보이거나/사라짐, target의 children element추가
        return toggleVisibility();
      }
      if (isVisible && !isInDOMSubtree(e.target, popperRef.current)) {  // 보여지고있고 클릭한곳이 popper내부가 아니면 사라짐
        setVisibility(false);
      }
    };

    useEffect(() => {
      elRef.current = document.getElementById(target);

      // HOVER
      if (toggle === "hover") {
        elRef.current.addEventListener("mouseenter", toggleVisibility);
        elRef.current.addEventListener("mouseleave", toggleVisibility);
        return () => {
          elRef.current.removeEventListener("mouseenter", toggleVisibility);
          elRef.current.removeEventListener("mouseleave", toggleVisibility);
        };
      }

      // CLICK
      if (toggle === "click") {
        elRef.current.addEventListener("click", toggleVisibility);
        return () =>
          elRef.current.removeEventListener("click", toggleVisibility);
      }
    }, [target]);

    useEffect(() => {
      // LEGACY
      if (toggle === "legacy") {
        document.addEventListener("click", legacyClick);
        return () => {
          document.removeEventListener("click", legacyClick);
        };
      }
    }, [target, isVisible]);

    useEffect(() => {
      if (elRef.current !== null && !targetElementIsVisible) {
        setTargetElementIsVisible(true);
      }
    }, [elRef.current]);

    return createPortal(
      targetElementIsVisible && isVisible ? (
        <Popper
          innerRef={popper => (popperRef.current = popper)}
          referenceElement={elRef.current}
          {...props}
        >
          {({ ref, style, placement, arrowProps }) => {
            return (
              <div
                className="popover z-50"  // z-50 tailwind 문법 추가됨
                ref={ref}
                style={style}
                data-placement={placement}
              >
                {children}
                <div ref={arrowProps.ref} style={arrowProps.style} />
              </div>
            );
          }}
        </Popper>
      ) : null,
      document.body
    );
  }
);

export default PopperWrapper;



/**
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Popper from "./Popper";
import "./styles.css";

function App() {
  const popperRef = useRef(null);

  const closePopper = () => {
    popperRef.current.setVisibility(true);
  };

  return (
    <div className="App">
      <h1 onClick={closePopper}>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button id="teste">TESTE 1!!!</button>
      <Popper
        initOpen={false}
        ref={popperRef}
        placement="bottom"
        target="teste"
        toggle="click"
      >
        <span id="teste2">TESTE 2!!!</span>
      </Popper>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

 */