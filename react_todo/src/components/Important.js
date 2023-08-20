import { useOutletContext } from "react-router-dom";
import AddTask from "../components/addtask/AddTask"

const Important = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return(
    <>
      {!collapseSidebar && <button onClick={() => {setCollapseSidebar(prevState => !prevState)}}>open/close</button>}
      <p>Important</p>
      <AddTask/>
    </>
  )
}

export default Important;