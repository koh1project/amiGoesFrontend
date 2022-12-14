import type { StackScreenProps } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../utils/const';
import { ConnectFilters } from './models';

type ScreenTypes = keyof typeof SCREEN_NAMES;
export type RootStackParamList = {
  Index: undefined;
  Signup: undefined;
  Login: undefined;
  Discover: undefined;
  Profile: undefined;
  EditProfile: undefined;
  CreateProfileStepOneForm: undefined;
  CreateProfileStepTwoForm: undefined;
  Camera: undefined;
  Translate: undefined;
  ConnectFilter: undefined;
  ConnectUsers: ConnectFilters;
  ConnectedAndBlockedScreen: undefined;
  PlaceProfile: undefined;
  GoNow: undefined;
  ConnectedUsersScreen: undefined;
  UserProfileScreen: undefined;
  EmergencyScreen: undefined;
  ConnectUserProfile: {
    userId: string;
    type?: 'accept' | 'send';
  };
  Onboarding: undefined;
  NotificationScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
