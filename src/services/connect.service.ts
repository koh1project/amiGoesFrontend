import { Amigo } from '../types/models';
import { get, post } from './api';

const ConnectEndpoint = {
  connectFeed: (userId) => `/connect/${userId}`,
  userProfile: (userId) => `/amigos/${userId}`,
  newConnectionRequest: (userId) => `/connect/${userId}`,
};
export const connectUsers = (userId: string) => {
  return get<Amigo[]>(ConnectEndpoint.connectFeed(userId));
};

export const getUserProfile = (userId: string) => {
  return get<Amigo>(ConnectEndpoint.userProfile(userId));
};

export const addAmigo = (userId: string, amigoId: string) => {
  return post(ConnectEndpoint.newConnectionRequest(userId), {
    targetUserId: amigoId,
  });
};
