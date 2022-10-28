import { post } from './api';

const UPLOAD_IMAGE_ENDPOINT = {
  post: '/s3',
};

export const uploadImage = async (image) => {
  post(UPLOAD_IMAGE_ENDPOINT.post, { image })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
