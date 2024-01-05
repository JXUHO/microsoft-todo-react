import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProtectedLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const [localStorageUser, setLocalStorageUser] = useLocalStorage("user", null);

  if (localStorageUser || user) {
    console.log("GOTO ROOT");
    return <Navigate to={"/"}/>  
  }

  return (
    <Outlet/>
  )

}

export default ProtectedLayout