import { patch } from './api';
import { UPDATE_NOTIFICATION_TOKEN_ENDPOINT } from './userProfile.service';

export const setExpoTokenForUser = async (userId, notificationsToken) => {
  const postUrl = UPDATE_NOTIFICATION_TOKEN_ENDPOINT.patch + userId;
  const result = await patch(postUrl, {
    notificationsToken: notificationsToken,
  });
};
