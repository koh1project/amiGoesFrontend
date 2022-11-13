import * as Notifications from 'expo-notifications';
import { patch } from '../services/api';
import {
  authUser,
  UPDATE_NOTIFICATION_TOKEN_ENDPOINT,
} from '../services/userProfile.service';

export const useNotificationsToken = () => {
  // token will be sent to the server after the user creates his/her profile
  const updateNotificationToken = async () => {
    const notificationsToken = (await Notifications.getExpoPushTokenAsync())
      .data;
    const userId = authUser().uid;
    const postUrl = UPDATE_NOTIFICATION_TOKEN_ENDPOINT.patch + userId;
    const result = await patch(postUrl, {
      notificationsToken: notificationsToken,
    });
  };

  return {
    updateNotificationToken,
  };
};
