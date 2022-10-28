import { GetDiscoverResponse } from '../types/discover';
import { get } from './api';

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
