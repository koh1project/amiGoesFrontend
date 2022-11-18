import { Place, PlaceDetail } from './../types/discover.d';
import { GetDiscoverResponse } from '../types/discover';
import { get, post } from './api';

const DISCOVER_ENDPOINT = {
  get: '/discover',
  getByKeyword: '/discover/keyword',
  getFavorites: '/discover/favorites',
  updateFavorites: '/discover/favorites/update',
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
    return get<PlaceDetail>(`${DISCOVER_ENDPOINT.get}/${place_id}`);
  } catch (error) {
    console.error('API getDiscover ERROR', error);
    throw error;
  }
};

export const getPlacesByKeyword = async (keyword: string) => {
  try {
    return get<Place[]>(`${DISCOVER_ENDPOINT.getByKeyword}/${keyword}`);
  } catch (error) {
    console.error('API getDiscover ERROR', error);
    throw error;
  }
};

export const getFavorites = (userId: string) => {
  return post<{ userId: string }, string[]>(DISCOVER_ENDPOINT.getFavorites, {
    userId,
  });
};

export const updateFavorites = (userId: string, place_id: string) => {
  return post<{ userId: string; place_id: string }>(
    `${DISCOVER_ENDPOINT.updateFavorites}`,
    {
      userId,
      place_id,
    },
  );
};
