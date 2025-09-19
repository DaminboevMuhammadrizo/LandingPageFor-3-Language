// locales.ts yoki i18n.ts faylida bo'lishi mumkin

export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uz';

// Translations uchun type (json faylingizga mos ravishda sozlang)
export interface Translations {
  articles: {
    title: string;
    article1: {
      title: string;
      description: string;
    };
    article2?: {
      title: string;
      description: string;
    };
    article3?: {
      title: string;
      description: string;
    };
    article4?: {
      title: string;
      description: string;
    };
    article: {
      heading: string;
      description: string;
    };
  };
}


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
export function getTranslation(translations: Translations, key: string): string {
  const value = key
    .split('.')
    .reduce<unknown>((obj, k) => {
      if (typeof obj === 'object' && obj !== null && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, translations);

  return typeof value === 'string' ? value : key;
}
