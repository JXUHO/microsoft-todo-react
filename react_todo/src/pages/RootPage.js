import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RootPage = () => {
  
  
  return(
    <>
    <Header />
    <Sidebar/>
    <Outlet/>
    </>
  )
}

export default RootPage;


// export const loader = () => {
//   return redirect("today")
// }