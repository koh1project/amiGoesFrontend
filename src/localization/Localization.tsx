import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
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
  },
  es: {},
});

i18n.enableFallback = true;
export default i18n;
