import { post } from './api';

const COMPARE_FACES_ENDPOINT = {
  post: '/compareFaces',
};

export const compareFaces = async (imageID, imageSelfie) => {
  return post(COMPARE_FACES_ENDPOINT.post, { imageID, imageSelfie });
};
