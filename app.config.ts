import { ExpoConfig } from '@expo/config-types';
import dotenv from 'dotenv';
dotenv.config();

export default (): ExpoConfig => {
  return {
    name: 'my-app1',
    slug: 'my-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      URL: process.env.URL,
      INITIAL_SCREEN: process.env.INITIAL_SCREEN || 'Index',
    },
  };
};
