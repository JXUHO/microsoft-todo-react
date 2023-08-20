import { useOutletContext } from "react-router-dom";

const FlaggedPage = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return(
    <>
      {!collapseSidebar && <button onClick={() => {setCollapseSidebar(prevState => !prevState)}}>open/close</button>}
      <p>flagged</p>
      
    </>
  )
}

export default FlaggedPage;