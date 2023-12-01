import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useLocalStorage } from "./useLocalStorage";

const useAuth = () => {
  const dispatch = useDispatch();

  const [localStorageUser, setLocalStorageUser] = useLocalStorage("user", null);

  useEffect(() => {
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
        console.log('login dispatch');
      } else {
        setLocalStorageUser(null)
        dispatch(logout());
        console.log('logout dispatch');
      }
    });
    return () => unsubscribe();
  }, []);


};

export default useAuth;
