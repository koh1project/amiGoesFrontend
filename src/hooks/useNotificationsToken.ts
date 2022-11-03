import * as Notifications from 'expo-notifications';
import { patch } from '../services/api';
import {
  authUser,
  UPDATE_NOTIFICATION_TOKEN_ENDPOINT,
} from '../services/userProfile.service';

export const useNotificationsToken = () => {
  const updateNotificationToken = async () => {
    const notificationsToken = (await Notifications.getExpoPushTokenAsync())
      .data;
    const userId = authUser().uid;
    console.log('notificationsToken from Index.js: ', notificationsToken);
    console.log('userId from Index.js: ', userId);
    const postUrl = UPDATE_NOTIFICATION_TOKEN_ENDPOINT.patch + userId;
    console.log('postUrl from Index.js: ', postUrl);
    const result = await patch(postUrl, {
      notificationsToken: notificationsToken,
    });
    if (result.data) {
      console.log('result.data: ', result.data);
    }
  };

  return {
    updateNotificationToken,
  };
};
