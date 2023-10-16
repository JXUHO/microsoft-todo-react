import { useOutletContext } from "react-router-dom";
import AddTask from "./addtask/AddTask"

const Inbox = () => {
  const [collapse, setCollapse] = useOutletContext();


  return(
    <>
       {!collapse.sidebar && (
        <button
          onClick={() => {
            setCollapse((prevState) => ({
              ...prevState,
              sidebar: !prevState.sidebar,
            }));
          }}
        >
          open/close
        </button>
      )}
      <p>Inbox</p>
      <AddTask/>
    </>
  )
}

export default Inbox;