import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useLocalStorage } from "./useLocalStorage";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch();
  const [localStorageUser, setLocalStorageUser] = useLocalStorage("user", null);

  useEffect(() => {
    setIsLoading(true)
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
          })
        );
        setLocalStorageUser(authUser.email)
        setIsLoading(false)
      } else {
        setLocalStorageUser(null)
        dispatch(logout());
        setIsLoading(false)
      }
    });
    return () => unsubscribe();
  }, []);

  return {isLoading}

};

export default useAuth;
