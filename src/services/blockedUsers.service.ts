import { get } from './api';
import { GetBlockedUsersResponse } from '../types/blockedUsers';

const BLOCKED_USERS_ENDPOINT = {
  get: '/blocked/blockedUsers/',
};

export const getBlockedUsers = async (userId) => {
  try {
    return get<GetBlockedUsersResponse>(BLOCKED_USERS_ENDPOINT.get + userId);
  } catch (error) {
    console.error('API getBlockedUsers ERROR', error);
    throw error;
  }
};
