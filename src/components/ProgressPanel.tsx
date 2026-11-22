import React, {useState} from 'react';
import {AlertCircle, Award, CheckCircle2, RotateCcw, Target, XCircle} from 'lucide-react';
import type {UiStrings} from '../i18n/uiTranslations';
import type {CueCategory, ProgressState} from '../types/cuelab';

interface ProgressPanelProps {
  progress: ProgressState;
  sampledAllCategories: boolean;
  strongestCategory: CueCategory | null;
  weakestCategory: CueCategory | null;
  onPracticeBlindSpot: (category: CueCategory) => void;
  onResetProgress: () => void;
  ui: UiStrings;
}

const CATEGORIES: CueCategory[] = ['facial', 'posture', 'mismatch', 'context'];

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  progress,
  sampledAllCategories,
  strongestCategory,
  weakestCategory,
  onPracticeBlindSpot,
  onResetProgress,
  ui,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);

  const accuracyPct =
    progress.totalAnswered > 0 ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100) : 0;
  const avgSec =
    progress.totalAnswered > 0 ? (progress.totalResponseMs / progress.totalAnswered / 1000).toFixed(1) : '0.0';

  return (
    <section id="diagnostics" aria-labelledby="diagnostics-heading" className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 id="diagnostics-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            {ui.progress.sectionTitle}
          </h2>
          <p className="text-sm text-slate-600">{ui.progress.sectionSubtitle}</p>
        </div>

        {/* Two-step inline reset (no window.confirm) */}
        {progress.totalAnswered > 0 && (
          <div>
            {confirmingReset ? (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs">
                <span className="font-medium text-amber-950">{ui.progress.resetConfirmPrompt}</span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmingReset(false);
                  }}
                  className="rounded-md bg-amber-700 px-2.5 py-1 font-semibold text-white hover:bg-amber-800 cursor-pointer"
                >
                  {ui.progress.resetConfirmYes}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  className="rounded-md border border-amber-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {ui.progress.resetCancel}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{ui.progress.resetButton}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 4-Column Tabular KPI Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500">{ui.progress.answeredLabel}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-mono-tabular tabular-nums">
            {progress.totalAnswered}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500">{ui.progress.accuracyLabel}</div>
          <div className="mt-1 text-2xl font-bold text-indigo-700 font-mono-tabular tabular-nums">
            {accuracyPct}%
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500">{ui.progress.avgResponseLabel}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 font-mono-tabular tabular-nums">
            {avgSec}
            {ui.workspace.secondsUnit}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500">{ui.progress.bestStreakLabel}</div>
          <div className="mt-1 text-2xl font-bold text-emerald-700 font-mono-tabular tabular-nums">
            {progress.bestStreak}
          </div>
        </div>
      </div>

      {/* Category Breakdown & Blind Spot Targeting */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900">{ui.progress.categoryBreakdownTitle}</h3>
            {sampledAllCategories && weakestCategory && (
              <button
                type="button"
                onClick={() => onPracticeBlindSpot(weakestCategory)}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer"
              >
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {ui.progress.practiceBlindSpotCta}: {ui.categories[weakestCategory]}
                </span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const stats = progress.byCategory[cat];
              const pct = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
              const isStrength = sampledAllCategories && strongestCategory === cat;
              const isBlindSpot = sampledAllCategories && weakestCategory === cat;

              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{ui.categories[cat]}</span>
                      {isStrength && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{ui.progress.strengthBadge}</span>
                        </span>
                      )}
                      {isBlindSpot && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{ui.progress.blindSpotBadge}</span>
                        </span>
                      )}
                      {sampledAllCategories && !isStrength && !isBlindSpot && (
                        <span className="text-xs text-slate-500">{ui.progress.balancedBadge}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-mono-tabular tabular-nums">
                      <span>
                        {stats.correct}/{stats.attempted}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-900">{pct}%</span>
                    </div>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isBlindSpot ? 'bg-amber-500' : isStrength ? 'bg-emerald-600' : 'bg-indigo-600'
                      }`}
                      style={{width: `${stats.attempted > 0 ? Math.max(pct, 4) : 0}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {!sampledAllCategories && (
            <p className="text-xs text-slate-500 pt-1">{ui.progress.noDataYet}</p>
          )}
        </div>

        {/* Recent Observations Log */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
          <h3 className="text-base font-semibold text-slate-900">{ui.progress.recentLogTitle}</h3>
          {progress.recentHistory.length === 0 ? (
            <p className="text-sm text-slate-500 py-6">{ui.progress.noDataYet}</p>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {progress.recentHistory.slice(0, 8).map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 py-2.5 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    {item.correct ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-4 w-4 text-amber-600 shrink-0" aria-hidden="true" />
                    )}
                    <span className="font-medium text-slate-800 truncate">{ui.categories[item.category]}</span>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-slate-500 whitespace-nowrap">
                      {item.correct ? ui.progress.passLabel : ui.progress.missLabel}
                    </span>
                  </div>
                  <span className="font-mono-tabular tabular-nums text-slate-500 shrink-0">
                    {(item.responseMs / 1000).toFixed(1)}
                    {ui.workspace.secondsUnit}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
