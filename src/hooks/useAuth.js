import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      try {
        if (authUser) {
          dispatch(login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL
          }))
        } else {
          dispatch(logout())
        }
        setLoading(false);

      } catch (error) {
        setError(error);
        setLoading(false);
      }
    });
    // const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    //   try {
    //     if (authUser) {
    //       setUser(authUser);
    //       setLoading(false);
    //     } else {
    //       setUser(null);
    //       setLoading(false);
    //     }
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // });

    return () => unsubscribe();
  }, []);

  return { loading, error };
};


export default useAuth;
