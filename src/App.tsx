import {useCallback, useState} from 'react';
import {Globe} from 'lucide-react';
import {AdSlot} from './components/AdSlot';
import {EditorialGuide} from './components/EditorialGuide';
import {ProgressPanel} from './components/ProgressPanel';
import {TrainingWorkspace} from './components/TrainingWorkspace';
import {useProgress} from './hooks/useProgress';
import {useSeoSync} from './hooks/useSeoSync';
import {EDITORIAL_TRANSLATIONS} from './i18n/editorialTranslations';
import {detectInitialLanguage, SUPPORTED_LANGUAGES} from './i18n/languages';
import {UI_TRANSLATIONS} from './i18n/uiTranslations';
import type {CueCategory, LangCode, TrainingMode} from './types/cuelab';

function detectInitialMode(): TrainingMode {
  if (typeof window === 'undefined') return 'rapid';
  const raw = new URLSearchParams(window.location.search).get('mode')?.toLowerCase();
  if (raw === 'mismatch' || raw === 'congruence') return 'mismatch';
  if (raw === 'baseline' || raw === 'context') return 'baseline';
  if (raw === 'coach' || raw === 'response') return 'coach';
  if (raw === 'rapid' || raw === 'spotter') return 'rapid';
  return 'rapid';
}

export default function App() {
  const [lang, setLang] = useState<LangCode>(detectInitialLanguage);
  const [mode, setMode] = useState<TrainingMode>(detectInitialMode);
  const [blindSpotCategory, setBlindSpotCategory] = useState<CueCategory | null>(null);

  useSeoSync(lang, mode);

  const {
    progress,
    recordAttempt,
    resetProgress,
    sampledAllCategories,
    strongestCategory,
    weakestCategory,
  } = useProgress();

  const ui = UI_TRANSLATIONS[lang];
  const editorial = EDITORIAL_TRANSLATIONS[lang];

  const handleLanguageChange = useCallback((nextLang: LangCode) => {
    setLang(nextLang);
    try {
      window.localStorage.setItem('cuelab_lang', nextLang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handlePracticeBlindSpot = useCallback((category: CueCategory) => {
    setBlindSpotCategory(category);
    const el = document.getElementById('trainer');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Single-Row 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            {ui.brandName}
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a href="#trainer" className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0">
              {ui.navTrainer}
            </a>
            <a href="#diagnostics" className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0">
              {ui.navDiagnostics}
            </a>
            <a href="#guide" className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0">
              {ui.navGuide}
            </a>
            <a href="#faq" className="hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0">
              {ui.navFaq}
            </a>
          </nav>

          {/* Zone 3: Language Selector */}
          <div className="flex items-center shrink-0">
            <label htmlFor="cuelab-lang-select" className="sr-only">
              {ui.languageLabel}
            </label>
            <div className="relative inline-flex items-center">
              <Globe
                className="pointer-events-none absolute start-2.5 h-4 w-4 text-slate-500"
                aria-hidden="true"
              />
              <select
                id="cuelab-lang-select"
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as LangCode)}
                className="min-h-[40px] appearance-none rounded-lg border border-slate-200 bg-white ps-8 pe-7 py-1.5 text-xs sm:text-sm font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.nativeName} ({item.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 space-y-12">
        {/* Editorial Hero Header */}
        <section className="space-y-3 max-w-4xl">
          <p className="text-xs sm:text-sm font-medium text-indigo-700">{ui.heroEyebrow}</p>
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            style={{textWrap: 'balance'}}
          >
            {ui.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {ui.heroSubtitle}
          </p>
        </section>

        {/* Interactive Nonverbal Training Lab */}
        <TrainingWorkspace
          lang={lang}
          mode={mode}
          onModeChange={setMode}
          blindSpotCategory={blindSpotCategory}
          onExitBlindSpot={() => setBlindSpotCategory(null)}
          onAttemptRecorded={recordAttempt}
          ui={ui}
        />

        {/* Strengths & Blind Spots Diagnostics */}
        <ProgressPanel
          progress={progress}
          sampledAllCategories={sampledAllCategories}
          strongestCategory={strongestCategory}
          weakestCategory={weakestCategory}
          onPracticeBlindSpot={handlePracticeBlindSpot}
          onResetProgress={resetProgress}
          ui={ui}
        />

        {/* Mid-Page Media.net Ad Slot (Between Trainer/Diagnostics & Editorial Guide) */}
        <AdSlot slotId="mid-leaderboard" ui={ui} />

        {/* SEO Practical Field Guide, Pitfalls Table, Interactive FAQ & Recommended Readings */}
        <EditorialGuide content={editorial} />

        {/* Bottom-of-Page Media.net Ad Slot */}
        <AdSlot slotId="bottom-leaderboard" ui={ui} />
      </main>

      {/* Semantic Footer with Mandatory Educational Disclaimer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {ui.footer.disclaimer}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>{ui.footer.copyright}</span>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#trainer" className="hover:text-slate-800 hover:underline">
                {ui.navTrainer}
              </a>
              <a href="#diagnostics" className="hover:text-slate-800 hover:underline">
                {ui.navDiagnostics}
              </a>
              <a href="#guide" className="hover:text-slate-800 hover:underline">
                {ui.navGuide}
              </a>
              <a href="#faq" className="hover:text-slate-800 hover:underline">
                {ui.navFaq}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
