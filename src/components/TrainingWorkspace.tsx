import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import {getScenariosByCategory, getScenariosByMode} from '../data/scenarios';
import type {UiStrings} from '../i18n/uiTranslations';
import type {CueCategory, LangCode, Scenario, TrainingMode, ViewZoomMode} from '../types/cuelab';
import {NonverbalSceneStage} from './NonverbalSceneStage';

interface TrainingWorkspaceProps {
  lang: LangCode;
  mode: TrainingMode;
  onModeChange: (mode: TrainingMode) => void;
  blindSpotCategory: CueCategory | null;
  onExitBlindSpot: () => void;
  onAttemptRecorded: (
    scenarioId: string,
    mode: TrainingMode,
    category: CueCategory,
    correct: boolean,
    responseMs: number,
  ) => void;
  ui: UiStrings;
}

const MODE_ORDER: TrainingMode[] = ['rapid', 'mismatch', 'baseline', 'coach'];
const RAPID_TIMER_SECONDS = 15;

export const TrainingWorkspace: React.FC<TrainingWorkspaceProps> = ({
  lang,
  mode,
  onModeChange,
  blindSpotCategory,
  onExitBlindSpot,
  onAttemptRecorded,
  ui,
}) => {
  const deck: Scenario[] = useMemo(() => {
    if (blindSpotCategory) {
      return getScenariosByCategory(blindSpotCategory);
    }
    return getScenariosByMode(mode);
  }, [mode, blindSpotCategory]);

  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<ViewZoomMode>('full');
  const [showMarkers, setShowMarkers] = useState(false);
  const [timedRapid, setTimedRapid] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RAPID_TIMER_SECONDS);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const scenarioStartRef = useRef<number>(Date.now());

  const activeScenario = deck[index] ?? deck[0];

  // Reset deck index when mode or blindSpotCategory changes
  useEffect(() => {
    setIndex(0);
    setSelectedIndex(null);
    setZoom('full');
    setShowMarkers(false);
    setDeckCompleted(false);
    setSecondsLeft(RAPID_TIMER_SECONDS);
    scenarioStartRef.current = Date.now();
  }, [mode, blindSpotCategory]);

  // Reset per-scenario timer and marker state when moving between scenarios
  useEffect(() => {
    setSelectedIndex(null);
    setShowMarkers(false);
    setSecondsLeft(RAPID_TIMER_SECONDS);
    scenarioStartRef.current = Date.now();
  }, [activeScenario?.id]);

  // Rapid mode optional countdown timer
  const isTimerActive =
    mode === 'rapid' && !blindSpotCategory && timedRapid && selectedIndex === null && !deckCompleted;

  useEffect(() => {
    if (!isTimerActive) return;
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isTimerActive, secondsLeft]);

  const handleSelectOption = useCallback(
    (optIndex: number) => {
      if (selectedIndex !== null || !activeScenario) return;
      const elapsed = Date.now() - scenarioStartRef.current;
      const isCorrect = optIndex === activeScenario.correctIndex;
      setSelectedIndex(optIndex);
      setShowMarkers(true);
      onAttemptRecorded(activeScenario.id, activeScenario.mode, activeScenario.category, isCorrect, elapsed);
    },
    [selectedIndex, activeScenario, onAttemptRecorded],
  );

  const handleNext = useCallback(() => {
    if (index + 1 >= deck.length) {
      setDeckCompleted(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  }, [index, deck.length]);

  const handleRestartDeck = useCallback(() => {
    setIndex(0);
    setSelectedIndex(null);
    setDeckCompleted(false);
    setShowMarkers(false);
    setSecondsLeft(RAPID_TIMER_SECONDS);
    scenarioStartRef.current = Date.now();
  }, []);

  const handleCopyShare = useCallback(async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?mode=${mode}&lang=${lang}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback ignored safely in restricted iframe contexts
    }
  }, [mode, lang]);

  // Keyboard shortcuts (1-4 to answer, Enter to advance)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      if (deckCompleted) return;
      if (selectedIndex === null) {
        if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
          e.preventDefault();
          handleSelectOption(Number(e.key) - 1);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, deckCompleted, handleSelectOption, handleNext]);

  if (!activeScenario) return null;

  const copy = activeScenario.translations[lang];
  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === activeScenario.correctIndex;
  const counterLabel = ui.workspace.scenarioCounter
    .replace('{current}', String(index + 1))
    .replace('{total}', String(deck.length));

  return (
    <section id="trainer" aria-labelledby="trainer-heading" className="space-y-6">
      {/* Mode Navigation Tabs */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 sm:inline-flex sm:flex-wrap"
          role="tablist"
          aria-label="Training modes"
        >
          {MODE_ORDER.map((m) => {
            const active = !blindSpotCategory && mode === m;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  if (blindSpotCategory) onExitBlindSpot();
                  onModeChange(m);
                }}
                className={`min-h-[42px] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="sm:hidden">{ui.modes[m].shortLabel}</span>
                <span className="hidden sm:inline">{ui.modes[m].label}</span>
              </button>
            );
          })}
        </div>

        {/* Utility Row: Rapid Timer Toggle + Share Link */}
        <div className="flex flex-wrap items-center gap-2">
          {mode === 'rapid' && !blindSpotCategory && (
            <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setTimedRapid(false)}
                className={`min-h-[36px] rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  !timedRapid ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ui.workspace.relaxedModeLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimedRapid(true);
                  setSecondsLeft(RAPID_TIMER_SECONDS);
                }}
                className={`inline-flex min-h-[36px] items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  timedRapid ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{ui.workspace.timedModeLabel}</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleCopyShare}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copiedLink ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            ) : (
              <Share2 className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
            )}
            <span>{copiedLink ? ui.workspace.linkCopied : ui.workspace.copyShareLink}</span>
          </button>
        </div>
      </div>

      {/* Blind-Spot Active Drill Banner */}
      {blindSpotCategory && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <div className="flex items-center gap-2 font-medium">
            <Target className="h-4 w-4 text-amber-700 shrink-0" aria-hidden="true" />
            <span>
              {ui.workspace.blindSpotActivePrefix} <strong>{ui.categories[blindSpotCategory]}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onExitBlindSpot}
            className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ui.workspace.exitDrillButton}</span>
          </button>
        </div>
      )}

      {/* Main Interactive Workspace Frame */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        {deckCompleted ? (
          <div className="mx-auto max-w-xl py-10 text-center space-y-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 id="trainer-heading" className="text-2xl font-bold text-slate-900">
                {ui.workspace.roundCompleteTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">{ui.workspace.roundCompleteSummary}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestartDeck}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>{ui.workspace.restartDeck}</span>
              </button>
              <a
                href="#diagnostics"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>{ui.navDiagnostics}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Unboxed Metadata Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 tabular-nums">
                  <span>{counterLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-indigo-700">{ui.categories[activeScenario.category]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{copy.contextLabel}</span>
                </div>
                <h2 id="trainer-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {copy.title}
                </h2>
              </div>

              {/* Rapid Timer Readout */}
              {mode === 'rapid' && !blindSpotCategory && timedRapid && (
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold font-mono-tabular tabular-nums ${
                    secondsLeft === 0
                      ? 'border-amber-300 bg-amber-50 text-amber-800'
                      : secondsLeft <= 5
                      ? 'border-amber-200 bg-amber-50/60 text-amber-700'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                  aria-live="polite"
                >
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {secondsLeft}
                    {ui.workspace.secondsUnit}
                  </span>
                </div>
              )}
            </div>

            {mode === 'rapid' && !blindSpotCategory && timedRapid && secondsLeft === 0 && !isAnswered && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-medium text-amber-900">
                {ui.workspace.timeExpiredLabel}
              </div>
            )}

            {/* Two-Zone Split Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left Zone: Interactive Visual SVG Stage */}
              <div className="lg:col-span-7">
                <NonverbalSceneStage
                  scene={activeScenario.scene}
                  baselineScene={activeScenario.baselineScene}
                  sceneALabel={copy.sceneALabel}
                  sceneBLabel={copy.sceneBLabel}
                  statement={copy.statement}
                  zoom={zoom}
                  onZoomChange={setZoom}
                  showMarkers={showMarkers}
                  onToggleMarkers={() => setShowMarkers((prev) => !prev)}
                  canToggleMarkers={isAnswered}
                  ui={ui}
                />
              </div>

              {/* Right Zone: Question, Options & Immediate Structured Feedback */}
              <div className="lg:col-span-5 space-y-4">
                <p className="text-base font-semibold text-slate-900 leading-snug">{copy.question}</p>

                <div className="space-y-2.5" role="radiogroup" aria-label={copy.question}>
                  {copy.options.map((optionText, optIdx) => {
                    const isSelected = selectedIndex === optIdx;
                    const isRightAnswer = optIdx === activeScenario.correctIndex;

                    let stateClasses =
                      'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40';
                    if (isAnswered) {
                      if (isRightAnswer) {
                        stateClasses = 'border-emerald-500 bg-emerald-50/70 text-emerald-950';
                      } else if (isSelected && !isRightAnswer) {
                        stateClasses = 'border-amber-500 bg-amber-50/80 text-amber-950';
                      } else {
                        stateClasses = 'border-slate-200 bg-slate-50/70 text-slate-500 opacity-80';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`flex w-full min-h-[48px] items-start gap-3 rounded-xl border p-3.5 text-start text-sm font-medium transition-all duration-150 ${stateClasses} ${
                          !isAnswered ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold tabular-nums ${
                            isAnswered && isRightAnswer
                              ? 'bg-emerald-600 text-white'
                              : isAnswered && isSelected && !isRightAnswer
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {optIdx + 1}
                        </span>
                        <span className="flex-1 leading-relaxed">{optionText}</span>
                      </button>
                    );
                  })}
                </div>

                {!isAnswered && (
                  <p className="text-xs text-slate-500">{ui.workspace.keyboardHint}</p>
                )}

                {/* Immediate Post-Answer Feedback */}
                {isAnswered && (
                  <div
                    className={`rounded-xl border p-4 space-y-3.5 cuelab-stage-enter ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'
                    }`}
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" aria-hidden="true" />
                      )}
                      <span
                        className={`text-sm font-bold ${isCorrect ? 'text-emerald-900' : 'text-amber-900'}`}
                      >
                        {isCorrect ? ui.workspace.correctTitle : ui.workspace.incorrectTitle}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <div>
                        <span className="font-semibold text-slate-900">{ui.workspace.whatToObserve}: </span>
                        <span>{copy.whatToObserve}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">{ui.workspace.whyContextMatters}: </span>
                        <span>{copy.whyContextMatters}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">{ui.workspace.commonPitfall}: </span>
                        <span>{copy.commonPitfall}</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                      >
                        <span>{ui.workspace.nextScenario}</span>
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
