import { Amigo } from '../types/models';
import { get } from './api';

const ConnectEndpoint = {
  connectFeed: (userId) => `/connect/${userId}`,
};
export const connectUsers = (userId: string) => {
  console.log(ConnectEndpoint.connectFeed(userId));
  return get<Amigo[]>(ConnectEndpoint.connectFeed(userId));
};