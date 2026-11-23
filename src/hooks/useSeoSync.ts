import {useEffect} from 'react';
import {CANONICAL_ORIGIN, getCanonicalUrl} from '../config/seo';
import {EDITORIAL_TRANSLATIONS} from '../i18n/editorialTranslations';
import {getLanguageMeta, SUPPORTED_LANGUAGES} from '../i18n/languages';
import {UI_TRANSLATIONS} from '../i18n/uiTranslations';
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

    // 3. Sync canonical, og:url & hreflang URLs strictly from CANONICAL_ORIGIN
    const canonicalUrl = getCanonicalUrl(lang);
    upsertLink('canonical', canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertLink('alternate', `${CANONICAL_ORIGIN}/`, 'x-default');
    for (const item of SUPPORTED_LANGUAGES) {
      upsertLink('alternate', getCanonicalUrl(item.code), item.hreflang);
    }

    // 4. Sync local browser URL query state cleanly (omitting ?lang=en on default root)
    const currentParams = new URLSearchParams(window.location.search);
    const desiredParams = new URLSearchParams();
    if (mode !== 'rapid' || currentParams.has('mode')) {
      desiredParams.set('mode', mode);
    }
    if (lang !== 'en') {
      desiredParams.set('lang', lang);
    }
    const desiredSearch = desiredParams.toString();
    const desiredRelativeUrl = `${window.location.pathname}${desiredSearch ? `?${desiredSearch}` : ''}${window.location.hash}`;
    const currentRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (desiredRelativeUrl !== currentRelativeUrl) {
      window.history.replaceState(null, '', desiredRelativeUrl);
    }

    // 5. Inject localized JSON-LD: SoftwareApplication + FAQPage using CANONICAL_ORIGIN
    upsertJsonLd('cuelab-jsonld-app', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${CANONICAL_ORIGIN}/#software`,
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
      '@id': `${canonicalUrl}#faq`,
      url: canonicalUrl,
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
