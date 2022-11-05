//import { post } from './api';
import { auth } from '../utils/firebase';

export const authUser = () => {
  return auth.currentUser;
};

export const CREATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/create',
};

export const UPDATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/update/',
};

export const UPDATE_NOTIFICATION_TOKEN_ENDPOINT = {
  patch: '/notifications/addNotificationToken/',
};
