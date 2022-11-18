import { Amigo, PendingRequestResponse } from '../types/models';
import { get, post } from './api';

const ConnectEndpoint = {
  connectFeed: (userId) => `/connect/${userId}`,
  userProfile: (userId) => `/amigos/${userId}`,
  newConnectionRequest: (userId) => `/connect/${userId}`,
  requests: (userId) => `/connect/requests/${userId}`,
  acceptRequest: (amigoId) => `/connect/acceptConnectionRequest/${amigoId}`,
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

export const acceptAmigo = (amigoId: string, userId: string) => {
  return post(ConnectEndpoint.acceptRequest(amigoId), {
    targetUserId: userId,
  });
};
export const getPendingRequests = (userId: string) => {
  return get<PendingRequestResponse[]>(ConnectEndpoint.requests(userId));
};
