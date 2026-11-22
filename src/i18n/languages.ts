import type {LangCode} from '../types/cuelab';

export interface LanguageMeta {
  code: LangCode;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  hreflang: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', hreflang: 'en'},
  {code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', hreflang: 'es'},
  {code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', hreflang: 'fr'},
  {code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', hreflang: 'de'},
  {code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', hreflang: 'pt'},
  {code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', hreflang: 'ru'},
  {code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr', hreflang: 'hi'},
  {code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', hreflang: 'ar'},
  {code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr', hreflang: 'zh'},
  {code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', hreflang: 'ja'},
];

export const LANGUAGE_CODES: LangCode[] = SUPPORTED_LANGUAGES.map((l) => l.code);

export function isSupportedLang(value: string | null | undefined): value is LangCode {
  if (!value) return false;
  return LANGUAGE_CODES.includes(value as LangCode);
}

export function detectInitialLanguage(): LangCode {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang')?.toLowerCase();
  if (isSupportedLang(urlLang)) {
    return urlLang;
  }

  try {
    const stored = window.localStorage.getItem('cuelab_lang');
    if (isSupportedLang(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }

  const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of navLangs) {
    if (!raw) continue;
    const prefix = raw.toLowerCase().split('-')[0];
    if (isSupportedLang(prefix)) {
      return prefix;
    }
  }

  return 'en';
}

export function getLanguageMeta(code: LangCode): LanguageMeta {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? SUPPORTED_LANGUAGES[0];
}
