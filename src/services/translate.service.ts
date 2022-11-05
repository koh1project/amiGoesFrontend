import { post } from './api';

const TRANSLATE_IMAGE_ENDPOINT = {
  post: '/translateImage',
};

const TEXT_ENDPOINT = {
  post: '/recognize',
};

const TRANSLATE_ENDPOINT = {
  post: '/translate',
};

export const postTranslate = async (language, image) => {
  return post(TRANSLATE_IMAGE_ENDPOINT.post, { language, image });
};

export const getText = async (image) => {
  return post(TEXT_ENDPOINT.post, { image });
};

export const translate = async (language, text) => {
  return post(TRANSLATE_ENDPOINT.post, { language, text });
};
