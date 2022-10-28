import { post } from './api';

const TRANSLATE_ENDPOINT = {
  post: '/translateImage',
};

export const postTranslate = async (language, image) => {
  return post(TRANSLATE_ENDPOINT.post, { language, image });
};
