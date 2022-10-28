import type { StackScreenProps } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../const';

type ScreenTypes = keyof typeof SCREEN_NAMES;
export type RootStackParamList = {
  [key in ScreenTypes]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
