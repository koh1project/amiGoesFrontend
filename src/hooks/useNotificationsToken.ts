import * as Notifications from 'expo-notifications';
import { setExpoTokenForUser } from '../services/notification.service';
import { useAuthContext } from '../components/auth/AuthContextProvider';

export const useNotificationsToken = () => {
  // token will be sent to the server after the user creates his/her profile
  const { user } = useAuthContext();
  const userId = user?.uid;
  const updateNotificationToken = async () => {
    const notificationsToken = (await Notifications.getExpoPushTokenAsync())
      .data;
    setExpoTokenForUser(userId, notificationsToken);
  };

  return {
    updateNotificationToken,
  };
};
