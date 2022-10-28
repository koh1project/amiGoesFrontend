import axios from 'axios';
import { BASE_URL } from '../const';

const DEFAULT_HEADERS = () => {
  return {
    Authorization: `Bearer ${'token'}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
};

export const get = async <T = any>(
  url: string,
  headers = DEFAULT_HEADERS(),
) => {
  try {
    return axios.get<T>(BASE_URL + url, {
      headers,
    });
  } catch (error) {
    console.error('API GET ERROR', error);
    throw error;
  }
};

export const post = async (
  url: string,
  data: any,
  headers = DEFAULT_HEADERS(),
) => {
  return axios.post(BASE_URL + url, data);
};

export const post = async (
  url: string,
  data = {},
  headers = DEFAULT_HEADERS(),
) => {
  console.log(BASE_URL + url);
  return axios.post(BASE_URL + url, data, {
    headers,
  });
};
