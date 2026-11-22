import {useEffect} from 'react';
import {getLanguageMeta, SUPPORTED_LANGUAGES} from '../i18n/languages';
import {UI_TRANSLATIONS} from '../i18n/uiTranslations';
import {EDITORIAL_TRANSLATIONS} from '../i18n/editorialTranslations';
import type {LangCode, TrainingMode} from '../types/cuelab';

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, payload: unknown): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
}

export function useSeoSync(lang: LangCode, mode: TrainingMode): void {
  useEffect(() => {
    const meta = getLanguageMeta(lang);
    const ui = UI_TRANSLATIONS[lang];
    const editorial = EDITORIAL_TRANSLATIONS[lang];
    const modeInfo = ui.modes[mode];

    // 1. Sync <html lang="..." dir="...">
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;

    // 2. Sync <title> and descriptions
    const fullTitle = `${modeInfo.seoTitleSuffix} — ${ui.seo.baseTitle}`;
    const fullDescription = `${modeInfo.description} ${ui.seo.baseDescription}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', fullDescription);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', fullDescription);
    upsertMeta('property', 'og:locale', meta.code);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', fullDescription);

    // 3. Sync canonical & hreflang URLs
    const originPath = `${window.location.origin}${window.location.pathname}`;
    const canonicalUrl = `${originPath}?mode=${mode}&lang=${lang}`;
    upsertLink('canonical', canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertLink('alternate', `${originPath}?mode=${mode}&lang=en`, 'x-default');
    for (const item of SUPPORTED_LANGUAGES) {
      upsertLink('alternate', `${originPath}?mode=${mode}&lang=${item.code}`, item.hreflang);
    }

    // 4. Sync URL query params cleanly without reloading
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.get('lang') !== lang || currentParams.get('mode') !== mode) {
      currentParams.set('mode', mode);
      currentParams.set('lang', lang);
      const nextUrl = `${window.location.pathname}?${currentParams.toString()}${window.location.hash}`;
      window.history.replaceState(null, '', nextUrl);
    }

    // 5. Inject localized JSON-LD: SoftwareApplication + FAQPage
    upsertJsonLd('cuelab-jsonld-app', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: ui.seo.baseTitle,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: meta.code,
      description: fullDescription,
      url: canonicalUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        ui.modes.rapid.label,
        ui.modes.mismatch.label,
        ui.modes.baseline.label,
        ui.modes.coach.label,
      ],
    });

    upsertJsonLd('cuelab-jsonld-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: meta.code,
      mainEntity: editorial.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }, [lang, mode]);
}
