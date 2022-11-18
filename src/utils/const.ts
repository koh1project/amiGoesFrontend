import Constants from 'expo-constants';

export const BASE_URL = Constants.expoConfig.extra.URL;

export const SCREEN_NAMES = {
  Index: 'Index',
  Signup: 'Signup',
  Login: 'Login',
  Discover: 'Discover',
  PlaceProfile: 'PlaceProfile',
  GoNow: 'GoNow',
  CreateProfileStepOneForm: 'CreateProfileStepOneForm',
  CreateProfileStepTwoForm: 'CreateProfileStepTwoForm',
  Camera: 'Camera',
  Translate: 'Translate',
  ConnectFilter: 'ConnectFilter',
  ConnectedUsersScreen: 'ConnectedUsersScreen',
  BlockedUsersScreen: 'BlockedUsersScreen',
  ConnectUsers: 'ConnectUsers',
  ConnectUserProfile: 'ConnectUserProfile',
  Onboarding: 'Onboarding',
  NotificationScreen: 'NotificationScreen',
} as const;

export const INITIAL_SCREEN = Constants.expoConfig.extra.INITIAL_SCREEN;

export const GOOGLE_MAPS_API_KEY =
  Constants.expoConfig.extra.GOOGLE_MAPS_API_KEY;

export const ActivitiesList = [
  'Walk',
  'Dinner',
  'Movie',
  'Shopping',
  'Coffee',
  'Sports',
];
