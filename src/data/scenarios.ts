import type {CueCategory, LangCode, LocalizedScenarioCopy, Scenario, TrainingMode} from '../types/cuelab';
import {SCENARIO_SPECS} from './scenarioSpecs';
import {RAPID_TRANSLATIONS_1_5} from './translations/rapid_1_5';
import {RAPID_TRANSLATIONS_6_10} from './translations/rapid_6_10';
import {MISMATCH_TRANSLATIONS_1_5} from './translations/mismatch_1_5';
import {MISMATCH_TRANSLATIONS_6_10} from './translations/mismatch_6_10';
import {BASELINE_TRANSLATIONS_1_5} from './translations/baseline_1_5';
import {BASELINE_TRANSLATIONS_6_10} from './translations/baseline_6_10';
import {COACH_TRANSLATIONS_1_5} from './translations/coach_1_5';
import {COACH_TRANSLATIONS_6_10} from './translations/coach_6_10';

const ALL_TRANSLATIONS_1_5 = {
  ...RAPID_TRANSLATIONS_1_5,
  ...MISMATCH_TRANSLATIONS_1_5,
  ...BASELINE_TRANSLATIONS_1_5,
  ...COACH_TRANSLATIONS_1_5,
} as Record<string, Record<Extract<LangCode, 'en' | 'es' | 'fr' | 'de' | 'pt'>, LocalizedScenarioCopy>>;

const ALL_TRANSLATIONS_6_10 = {
  ...RAPID_TRANSLATIONS_6_10,
  ...MISMATCH_TRANSLATIONS_6_10,
  ...BASELINE_TRANSLATIONS_6_10,
  ...COACH_TRANSLATIONS_6_10,
} as Record<string, Record<Extract<LangCode, 'ru' | 'hi' | 'ar' | 'zh' | 'ja'>, LocalizedScenarioCopy>>;

export const SCENARIOS: Scenario[] = SCENARIO_SPECS.map((spec) => {
  const part1 = ALL_TRANSLATIONS_1_5[spec.id];
  const part2 = ALL_TRANSLATIONS_6_10[spec.id];
  return {
    ...spec,
    translations: {
      ...part1,
      ...part2,
    },
  };
});

export function getScenariosByMode(mode: TrainingMode): Scenario[] {
  return SCENARIOS.filter((s) => s.mode === mode);
}

export function getScenariosByCategory(category: CueCategory): Scenario[] {
  return SCENARIOS.filter((s) => s.category === category);
}
