import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../../utils/firebase';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const contextValue = useContext(AuthContext);

  const contextName = 'AuthContextProvider';
  if (contextValue === null || contextValue === undefined) {
    throw new Error(
      `Wrap your components tree with a ${contextName} component`,
    );
  }

  return contextValue;
};
export default AuthContext;
