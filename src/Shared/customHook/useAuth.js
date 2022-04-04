import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react/cjs/react.production.min';
import { auth } from '../../config/firebase';

// Exemple use of useAuth hook
// const currentUser = useAuth();
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  // ComponentDidMount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsubscribe;
  }, []);

  return currentUser;
}
