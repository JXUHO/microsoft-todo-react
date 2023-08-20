import { useOutletContext } from "react-router-dom";
import AddTask from "../components/addtask/AddTask"

const Planned = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return(
    <>
      {!collapseSidebar && <button onClick={() => {setCollapseSidebar(prevState => !prevState)}}>open/close</button>}
      <p>Planned</p>
      <AddTask/>
    </>
  )
}

export default Planned;