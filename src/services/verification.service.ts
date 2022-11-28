import { post } from './api';

const COMPARE_FACES_ENDPOINT = {
  post: '/compareFaces',
};

const VERIFY_IDENTITY_ENDPOINT = {
  post: '/verifyId',
};

export const compareFaces = async (imageID, imageSelfie) => {
  return post(COMPARE_FACES_ENDPOINT.post, { imageID, imageSelfie });
};

export const verifyId = async (imageID) => {
  return post(VERIFY_IDENTITY_ENDPOINT.post, { imageID });
};
