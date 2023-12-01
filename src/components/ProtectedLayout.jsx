import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProtectedLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const [localStorageUser, setLocalStorageUser] = useLocalStorage("user", null);
  useAuth()

  if (localStorageUser || user) {
    return <Navigate to={"/"}/>  
  }

  return (
    <Outlet/>
  )

}

export default ProtectedLayout