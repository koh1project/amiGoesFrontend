import { get } from './api';
import { post } from './api';

const BLOCKED_USERS_ENDPOINT = {
  get: '/blocked/blockedUsers/',
};

export const getBlockedUsers = async (userId) => {
  try {
    return get(BLOCKED_USERS_ENDPOINT.get + userId);
  } catch (error) {
    console.error('API getBlockedUsers ERROR', error);
    throw error;
  }
};

const BLOCK_USER_ENDPOINT = {
  postUserId: '/blocked/userId/',
  postBlockedUserId: '/blockedUserId/',
};

export const blockUser = async (userId, blockedUserId) => {
  try {
    // console.log('userId', userId);
    // console.log('id', blockedUserId);
    return post(
      BLOCK_USER_ENDPOINT.postUserId +
        userId +
        BLOCK_USER_ENDPOINT.postBlockedUserId +
        blockedUserId,
    );
  } catch (error) {
    console.error('API blockUser ERROR', error);
    throw error;
  }
};

const UNBLOCK_USER_ENDPOINT = {
  postUserId: '/blocked/userId/',
  postUnBlockedUserId: '/unBlockedUserId/',
};

export const unBlockUser = async (userId, unBlockedUserId) => {
  try {
    // console.log('userId', userId);
    // console.log('id', unBlockedUserId);
    return post(
      UNBLOCK_USER_ENDPOINT.postUserId +
        userId +
        UNBLOCK_USER_ENDPOINT.postUnBlockedUserId +
        unBlockedUserId,
    );
  } catch (error) {
    console.error('API blockUser ERROR', error);
    throw error;
  }
};
