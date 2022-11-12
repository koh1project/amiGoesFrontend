import { get } from './api';
import { GetConnectedUsersResponse } from '../types/connectedUsers';

const CONNECTED_USERS_ENDPOINT = {
  get: '/connect/connectedUsers/ ',
};

export const getConnectedUsers = (userId) => {
  try {
    return get<GetConnectedUsersResponse>(
      CONNECTED_USERS_ENDPOINT.get + userId,
    );
  } catch (error) {
    console.error('API getConnectedUsers ERROR', error);
    throw error;
  }
};
