import { Amigo } from '../types/models';
import { get } from './api';

const ConnectEndpoint = {
  connectFeed: (userId) => `/connect/${userId}`,
  userProfile: (userId) => `/amigos/${userId}`,
};
export const connectUsers = (userId: string) => {
  return get<Amigo[]>(ConnectEndpoint.connectFeed(userId));
};

export const getUserProfile = (userId: string) => {
  return get<Amigo>(ConnectEndpoint.userProfile(userId));
};
