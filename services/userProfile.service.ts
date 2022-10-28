//import { post } from './api';
import { auth } from '../firebase';

export const authUser = () => {
    return auth.currentUser;
}

export const CREATE_USERPROFILE_ENDPOINT = {
  post: '/amigos/create',
};
