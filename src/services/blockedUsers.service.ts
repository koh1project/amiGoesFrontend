import { get } from './api';
import { GetBlockedUsersResponse } from '../types/blockedUsers';

const BLOCKED_USERS_ENDPOINT = {
  get: '/blocked/',
};

export const getBlockedUsers = async () => {
  try {
    return get<GetBlockedUsersResponse>(BLOCKED_USERS_ENDPOINT.get);
  } catch (error) {
    console.error('API getBlockedUsers ERROR', error);
    throw error;
  }
};
