import { get } from './api';
import { GetConnectedUsersResponse } from '../types/connectedUsers';

const CONNECTED_USERS_ENDPOINT = {
  get: '/connect',
};

export const getConnectedUsers = async () => {
  try {
    return get<GetConnectedUsersResponse>(CONNECTED_USERS_ENDPOINT.get);
  } catch (error) {
    console.error('API getConnectedUsers ERROR', error);
    throw error;
  }
};
