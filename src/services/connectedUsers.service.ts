import { get } from './api';
import { GetConnectedUsersResponse } from '../types/connectedUsers';
import useGetUserId from '../utils/useGetUserId';

const CONNECTED_USERS_ENDPOINT = {
  get: '/connect/connectedUsers/ ',
};

// const [id, setId] = useState('');

const userId = async () => {
  const id = await useGetUserId();
  return id;
};

console.log('userId', userId());

export const getConnectedUsers = () => {
  try {
    return get<GetConnectedUsersResponse>(
      CONNECTED_USERS_ENDPOINT.get + userId(),
    );
  } catch (error) {
    console.error('API getConnectedUsers ERROR', error);
    throw error;
  }
};
