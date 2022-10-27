import { TextSearchResponse } from '@googlemaps/google-maps-services-js/dist/places/textsearch';
import * as Location from 'expo-location';

export type Place = TextSearchResponse['data']['results'][0];

export type GetDiscoverResponse = {
  parks: Place[];
  restaurants: Place[];
  entertainment: Place[];
  sports: Place[];
};

export type UserLocation = Location.LocationObject;
