import { get } from './api';
// import { auth } from '../utils/firebase';

// export const authUser = () => {
//   return auth.currentUser;
// };

export const CREATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/create',
};

export const UPDATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/update/',
};

export const UPDATE_NOTIFICATION_TOKEN_ENDPOINT = {
  patch: '/notifications/addNotificationToken/',
};

const GET_USERPROFILE_ENDPOINT = {
  get: '/amigos/',
};

export const getUserProfile = async (userId) => {
  try {
    return get(GET_USERPROFILE_ENDPOINT.get + userId);
  } catch (error) {
    console.error('API getUserProfile ERROR', error);
    throw error;
  }
};
