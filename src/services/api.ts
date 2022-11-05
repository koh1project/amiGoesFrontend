import axios from 'axios';
import { BASE_URL } from '../utils/const';

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

export const post = async <T>(
  url: string,
  data: T,
  headers = DEFAULT_HEADERS(),
) => {
  try {
    return axios.post(BASE_URL + url, data, {
      headers,
    });
  } catch (e) {
    console.log(e);
  }
};

export const patch = async <T>(
  url: string,
  data: T,
  headers = DEFAULT_HEADERS(),
) => {
  try {
    return axios.patch(BASE_URL + url, data, {
      headers,
    });
  } catch (e) {
    console.log(e);
  }
};
