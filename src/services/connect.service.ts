import { Amigo, PendingRequestResponse } from '../types/models';
import { get, patch, post } from './api';

const ConnectEndpoint = {
  connectFeed: (userId) => `/connect/${userId}`,
  userProfile: (userId) => `/amigos/${userId}`,
  newConnectionRequest: (userId) => `/connect/${userId}`,
  requests: (userId) => `/connect/requests/${userId}`,
  acceptRequest: (amigoId) => `/connect/acceptConnectionRequest/${amigoId}`,
  updatePreference: (userId) => `/connect/updateConnectPreferences/${userId}`,
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
export const updateConnectPreferences = (
  userId: string,
  connectPreferences: any,
) => {
  return patch(ConnectEndpoint.updatePreference(userId), {
    connectPreferences,
  });
};

export const acceptAmigo = (amigoId: string, userId: string) => {
  return patch(ConnectEndpoint.acceptRequest(userId), {
    targetUserId: amigoId,
  });
};
export const getPendingRequests = (userId: string) => {
  return get<PendingRequestResponse[]>(ConnectEndpoint.requests(userId));
};
