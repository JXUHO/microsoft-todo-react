import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Set up an observer to watch for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
        console.log(authUser.email);
      } else {
        return {}
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
