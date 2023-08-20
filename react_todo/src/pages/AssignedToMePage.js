import { useOutletContext } from "react-router-dom";

const AssignedToMe = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return(
    <>
      {!collapseSidebar && <button onClick={() => {setCollapseSidebar(prevState => !prevState)}}>open/close</button>}
      <p>AssignedToMePage</p>

    </>
  )
}

export default AssignedToMe;