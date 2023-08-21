import { useOutletContext } from "react-router-dom";
import AddTask from "../components/addtask/AddTask"

const Important = () => {
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
      <p>Important</p>
      <AddTask/>
    </>
  )
}

export default Important;