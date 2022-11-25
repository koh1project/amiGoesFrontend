import { LocationObject } from 'expo-location';
import { Amigo } from '../types/models';
import { get, post } from './api';
// import { auth } from '../utils/firebase';

// export const authUser = () => {
//   return auth.currentUser;
// };

export const CREATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/create',
};

export const UPDATE_USERPROFILE_ENDPOINT = {
  patch: '/amigos/update/',
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

const UPDATE_USER_LOCATION_ENDPOINT = '/amigos/update-location';
export const setUserLocation = async (location: LocationObject, userId) => {
  try {
    return post(`${UPDATE_USER_LOCATION_ENDPOINT}/${userId}`, {
      location,
    }).catch((e) => console.log(e));
  } catch (e) {
    console.error(e);
  }
};

const GET_AMIGO_LOCATION = (user) => `/amigos/location/${user}`;

export const getAmigosFromLocation = async (
  location: LocationObject,
  userId,
) => {
  try {
    return get<Amigo[]>(GET_AMIGO_LOCATION(userId)).catch((e) =>
      console.log(e),
    );
  } catch (e) {
    console.error(e);
  }
};
