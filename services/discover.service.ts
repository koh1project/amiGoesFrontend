import { get } from './api';

const DISCOVER_ENDPOINT = {
  get: '/discover',
};

export const getDiscover = async () => {
  return get(DISCOVER_ENDPOINT.get);
};
