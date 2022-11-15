import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
    Nouns: {
      Connect: 'Connect',
    },
    IndexScreen: {
      Discover: 'Discover',
      Connect: 'Connect',
      Profile: 'Profile',
      Translate: 'Translate',
      My_Amigoes: 'My Amigoes',
      Favorites: 'Favorites',
      HowToUse_Button: 'How to Use',
      AccountButton: 'Account',
    },
    ConnectScreen: {
      YourDistancePreference: 'Your distance preference',
      YourDistanceDescription:
        'Set the distance to choose which activities and AmiGoes are ready for you. You can change it anytime.',
    },
  },
  es: {},
});

i18n.enableFallback = true;
export default i18n;
