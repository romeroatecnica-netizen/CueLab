import type {LangCode, TrainingMode} from '../types/cuelab';

export const CANONICAL_ORIGIN = 'https://cuelab.bastelar.com';

export function getCanonicalUrl(lang: LangCode): string {
  return lang === 'en' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}/?lang=${lang}`;
}

export function getShareUrl(mode: TrainingMode, lang: LangCode): string {
  const params = new URLSearchParams();
  params.set('mode', mode);
  if (lang !== 'en') {
    params.set('lang', lang);
  }
  return `${CANONICAL_ORIGIN}/?${params.toString()}`;
}
