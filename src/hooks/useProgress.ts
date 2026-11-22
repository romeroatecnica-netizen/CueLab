import {useCallback, useEffect, useState} from 'react';
import type {AttemptRecord, CueCategory, ProgressState, TrainingMode} from '../types/cuelab';

const STORAGE_KEY = 'cuelab_progress_v1';

const INITIAL_STATE: ProgressState = {
  totalAnswered: 0,
  totalCorrect: 0,
  totalResponseMs: 0,
  currentStreak: 0,
  bestStreak: 0,
  byCategory: {
    facial: {attempted: 0, correct: 0},
    posture: {attempted: 0, correct: 0},
    mismatch: {attempted: 0, correct: 0},
    context: {attempted: 0, correct: 0},
  },
  recentHistory: [],
};

function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (!parsed || typeof parsed.totalAnswered !== 'number' || !parsed.byCategory) {
      return INITIAL_STATE;
    }
    return {
      totalAnswered: parsed.totalAnswered ?? 0,
      totalCorrect: parsed.totalCorrect ?? 0,
      totalResponseMs: parsed.totalResponseMs ?? 0,
      currentStreak: parsed.currentStreak ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
      byCategory: {
        facial: parsed.byCategory.facial ?? {attempted: 0, correct: 0},
        posture: parsed.byCategory.posture ?? {attempted: 0, correct: 0},
        mismatch: parsed.byCategory.mismatch ?? {attempted: 0, correct: 0},
        context: parsed.byCategory.context ?? {attempted: 0, correct: 0},
      },
      recentHistory: Array.isArray(parsed.recentHistory) ? parsed.recentHistory.slice(0, 20) : [],
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota or private-mode restrictions
    }
  }, [progress]);

  const recordAttempt = useCallback(
    (scenarioId: string, mode: TrainingMode, category: CueCategory, correct: boolean, responseMs: number) => {
      const clampedMs = Math.max(250, Math.min(responseMs, 120000));
      setProgress((prev) => {
        const nextStreak = correct ? prev.currentStreak + 1 : 0;
        const nextBest = Math.max(prev.bestStreak, nextStreak);
        const catStats = prev.byCategory[category];
        const entry: AttemptRecord = {
          id: `${scenarioId}-${Date.now()}`,
          scenarioId,
          mode,
          category,
          correct,
          responseMs: clampedMs,
          timestamp: Date.now(),
        };

        return {
          totalAnswered: prev.totalAnswered + 1,
          totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
          totalResponseMs: prev.totalResponseMs + clampedMs,
          currentStreak: nextStreak,
          bestStreak: nextBest,
          byCategory: {
            ...prev.byCategory,
            [category]: {
              attempted: catStats.attempted + 1,
              correct: catStats.correct + (correct ? 1 : 0),
            },
          },
          recentHistory: [entry, ...prev.recentHistory].slice(0, 20),
        };
      });
    },
    [],
  );

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const categories: CueCategory[] = ['facial', 'posture', 'mismatch', 'context'];
  const sampledAllCategories = categories.every((c) => progress.byCategory[c].attempted >= 1);

  let strongestCategory: CueCategory | null = null;
  let weakestCategory: CueCategory | null = null;

  if (sampledAllCategories) {
    let bestAcc = -1;
    let worstAcc = 2;
    for (const cat of categories) {
      const stats = progress.byCategory[cat];
      const acc = stats.attempted > 0 ? stats.correct / stats.attempted : 0;
      if (acc > bestAcc) {
        bestAcc = acc;
        strongestCategory = cat;
      }
      if (acc < worstAcc) {
        worstAcc = acc;
        weakestCategory = cat;
      }
    }
    if (strongestCategory === weakestCategory) {
      weakestCategory = null;
    }
  }

  return {
    progress,
    recordAttempt,
    resetProgress,
    sampledAllCategories,
    strongestCategory,
    weakestCategory,
  };
}
