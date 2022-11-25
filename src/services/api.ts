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
  return axios
    .get<T>(BASE_URL + url, {
      headers,
    })
    .catch((error) => {
      if (error.response) {
        console.error('Api Error', error.response.data);
      }
    });
};

export const post = async <T, R = any>(
  url: string,
  data: T,
  headers = DEFAULT_HEADERS(),
) => {
  try {
    return axios
      .post<R>(BASE_URL + url, data, {
        headers,
      })
      .catch((e) => console.log({ error: e, route: BASE_URL + url }));
  } catch (e) {
    console.error(e);
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
    console.error(e);
  }
};
