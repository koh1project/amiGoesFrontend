import * as Notifications from 'expo-notifications';
import { setExpoTokenForUser } from '../services/notification.service';
import { authUser } from '../services/userProfile.service';

export const useNotificationsToken = () => {
  // token will be sent to the server after the user creates his/her profile
  const updateNotificationToken = async () => {
    const notificationsToken = (await Notifications.getExpoPushTokenAsync())
      .data;
    const userId = authUser().uid;
    setExpoTokenForUser(userId, notificationsToken);
  };

  return {
    updateNotificationToken,
  };
};
