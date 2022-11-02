import { Place } from '@googlemaps/google-maps-services-js';
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

export const getPlaceById = async (place_id) => {
  try {
    return get<Place>(`${DISCOVER_ENDPOINT.get}/${place_id}`);
  } catch (error) {
    console.error('API getDiscover ERROR', error);
    throw error;
  }
};
