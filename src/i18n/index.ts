import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import appEn from './en/common.json';
import appKO from './ko/common.json';
import { LANGUAGES } from '../constants';

i18next
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: LANGUAGES.KOREAN,
    debug: true,
    interpolation: {},
    lng: LANGUAGES.KOREAN, // Force the default language to Korean
    resources: {
      en: {
        common: appEn,
      },
      ko: {
        common: appKO,
      },
    },
    react: { useSuspense: false },
  });
  // i18next.changeLanguage('ko'); 
export default i18next;
