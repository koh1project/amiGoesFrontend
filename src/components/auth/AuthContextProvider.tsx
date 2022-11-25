import * as Localization from 'expo-localization';
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import i18n from '../../localization/Localization';
import { auth } from '../../utils/firebase';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState();
  const [location, setLocation] = useState<LocationObject>();

  const getLocation = useCallback(async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const deviceLocation = await getCurrentPositionAsync({});
      setLocation(deviceLocation);
    }
  }, []);
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
    getLocation();
    i18n.locale = Localization.locale;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn, location }}>
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
