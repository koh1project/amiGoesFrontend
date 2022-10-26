import axios from 'axios';
import { BASE_URL } from '../const';

const DEFAULT_HEADERS = () => {
  return {
    Authorization: `Bearer ${'token'}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};

export const get = async (url: string, headers = DEFAULT_HEADERS()) => {
  return axios.get(BASE_URL + url, {
    headers,
  });
};
