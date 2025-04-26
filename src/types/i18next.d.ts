import { Resource } from 'i18next';
import en from '../../public/locales/en/translation.json';

export type TranslationKeys = typeof en;

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            translation: TranslationKeys;
        };
    }
}
