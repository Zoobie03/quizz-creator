import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

// Exemple use of useAuth hook
function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  // ComponentDidMount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsubscribe;
  }, []);

  return currentUser;
}

export default useAuth;
