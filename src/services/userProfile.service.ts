import { get } from './api';
import { useAuthContext } from '../components/auth/AuthContextProvider';
// import { auth } from '../utils/firebase';

// export const authUser = () => {
//   return auth.currentUser;
// };
const user = useAuthContext();

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

export const getUserProfile = async () => {
  try {
    return get((GET_USERPROFILE_ENDPOINT + user.id).get);
  } catch (error) {
    console.error('API getUserProfile ERROR', error);
    throw error;
  }
};
