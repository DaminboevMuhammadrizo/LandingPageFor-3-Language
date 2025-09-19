export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

// Translation yuklovchi funksiya
export async function getTranslations(locale: Locale) {
  try {
    const translations = await import(`../../locales/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Translation for locale ${locale} not found`);
    // Default locale ga qaytamiz
    const defaultTranslations = await import(`../../locales/${defaultLocale}.json`);
    return defaultTranslations.default;
  }
}

// Translation key ni olish funksiyasi
export function getTranslation(translations: any, key: string): string {
  return key.split('.').reduce((obj, k) => obj?.[k], translations) || key;
}
