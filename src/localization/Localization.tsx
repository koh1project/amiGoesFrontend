import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: { welcome: 'Hello' },
  ja: { welcome: 'こんにちは' },
});

i18n.enableFallback = true;
export default i18n;
