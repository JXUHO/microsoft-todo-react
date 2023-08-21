import { useOutletContext } from "react-router-dom";

const SearchPage = () => {
  const [collapseSidebar, setCollapseSidebar] = useOutletContext();


  return(
    <>
      {!collapseSidebar && <button onClick={() => {setCollapseSidebar(prevState => !prevState)}}>open/close</button>}
      <p>Searchpage</p>
    </>
  )
}

export default SearchPage;