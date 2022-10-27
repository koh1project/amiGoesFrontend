import { get } from './api';
import { GetDiscoverResponse } from '../types/discover';

const DISCOVER_ENDPOINT = {
  get: '/discover',
};

export const getDiscover = async () => {
  try {
    return get<GetDiscoverResponse>(DISCOVER_ENDPOINT.get);
  } catch (error) {
    console.error('API getDiscover ERROR', error);
    throw error;
  }
};
