import Constants from 'expo-constants';
import i18n from '../localization/Localization';

export const BASE_URL = Constants.expoConfig.extra.URL;

export const SCREEN_NAMES = {
  Index: 'Index',
  Signup: 'Signup',
  Login: 'Login',
  Discover: 'Discover',
  PlaceProfile: 'PlaceProfile',
  GoNow: 'GoNow',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  CreateProfileStepOneForm: 'CreateProfileStepOneForm',
  CreateProfileStepTwoForm: 'CreateProfileStepTwoForm',
  Camera: 'Camera',
  Translate: 'Translate',
  ConnectFilter: 'ConnectFilter',
  ConnectedUsersScreen: 'ConnectedUsersScreen',
  BlockedUsersScreen: 'BlockedUsersScreen',
  ConnectUsers: 'ConnectUsers',
  UserProfileScreen: 'UserProfileScreen',
  EmergencyScreen: 'EmergencyScreen',
  IDVerification: 'IDVerification',
  ConnectUserProfile: 'ConnectUserProfile',
  Onboarding: 'Onboarding',
  NotificationScreen: 'NotificationScreen',
} as const;

export const INITIAL_SCREEN = Constants.expoConfig.extra.INITIAL_SCREEN;

export const GOOGLE_MAPS_API_KEY =
  Constants.expoConfig.extra.GOOGLE_MAPS_API_KEY;

export const ActivitiesList = () => {
  const activities = [
    i18n.t('ActivitiesList.Walk'),
    i18n.t('ActivitiesList.Dinner'),
    i18n.t('ActivitiesList.Movie'),
    i18n.t('ActivitiesList.Shopping'),
    i18n.t('ActivitiesList.Coffee'),
    i18n.t('ActivitiesList.Sports'),
  ];
  return activities;
};

export const languagesOptions = [
  {
    id: 'English',
    name: 'English',
  },
  {
    id: 'Spanish',
    name: 'Spanish',
  },
  {
    id: 'French',
    name: 'French',
  },
  {
    id: 'German',
    name: 'German',
  },
  {
    id: 'Italian',
    name: 'Italian',
  },
  {
    id: 'Portuguese',
    name: 'Portuguese',
  },
];

export const hobbiesOptions = [
  {
    id: 'Sports',
    name: 'Sports',
  },
  {
    id: 'Music',
    name: 'Music',
  },
  {
    id: 'Reading',
    name: 'Reading',
  },
  {
    id: 'Cooking',
    name: 'Cooking',
  },
  {
    id: 'Dancing',
    name: 'Dancing',
  },
  {
    id: 'Writing',
    name: 'Writing',
  },
  {
    id: 'Art',
    name: 'Art',
  },
  {
    id: 'Photography',
    name: 'Photography',
  },
  {
    id: 'Other',
    name: 'Other',
  },
];
