export type LangCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ru'
  | 'hi'
  | 'ar'
  | 'zh'
  | 'ja';

export type TrainingMode = 'rapid' | 'mismatch' | 'baseline' | 'coach';

export type CueCategory = 'facial' | 'posture' | 'mismatch' | 'context';

export type ViewZoomMode = 'full' | 'face' | 'hands';

export type EyebrowState =
  | 'relaxed'
  | 'raised'
  | 'furrowed'
  | 'asymmetric'
  | 'inner-raised';

export type EyeState =
  | 'direct'
  | 'averted-left'
  | 'averted-right'
  | 'downcast'
  | 'narrowed'
  | 'wide'
  | 'squint-smile';

export type MouthState =
  | 'neutral'
  | 'duchenne-smile'
  | 'tense-smile'
  | 'tight-lips'
  | 'asymmetric-smirk'
  | 'parted'
  | 'downturned';

export type HeadTilt = 'none' | 'left' | 'right' | 'forward' | 'back';

export type TorsoPosture =
  | 'open-upright'
  | 'leaning-forward'
  | 'leaning-back'
  | 'closed-hunched'
  | 'angled-away';

export type ShoulderState = 'relaxed' | 'raised-tense' | 'asymmetric-shrug';

export type HandGesture =
  | 'open-visible'
  | 'arms-crossed'
  | 'neck-touch'
  | 'face-touch'
  | 'hands-clasped'
  | 'illustrative-gesture'
  | 'palms-down'
  | 'fidget-cuff';

export type ProxemicsLevel =
  | 'close-invasive'
  | 'comfortable'
  | 'distant-guarded';

export type SceneEnvironment =
  | 'office-desk'
  | 'interview-table'
  | 'cafe-table'
  | 'negotiation-room'
  | 'standing-hall';

export type PhysicalBarrier = 'none' | 'laptop' | 'table-edge' | 'notebook-shield';

export type FocusZone = 'brows-eyes' | 'mouth-jaw' | 'neck-hands' | 'torso-space';

export interface PersonaStyle {
  hairStyle: 'short' | 'bob' | 'bun' | 'parted' | 'curly' | 'bald';
  skinTone: string;
  hairColor: string;
  outfitColor: string;
  outfitStyle: 'blazer' | 'shirt' | 'sweater' | 'turtleneck';
}

export interface SceneSpec {
  persona: PersonaStyle;
  eyebrows: EyebrowState;
  eyes: EyeState;
  mouth: MouthState;
  jawTension?: boolean;
  headTilt: HeadTilt;
  torso: TorsoPosture;
  shoulders: ShoulderState;
  hands: HandGesture;
  proxemics: ProxemicsLevel;
  environment: SceneEnvironment;
  barrier: PhysicalBarrier;
  contextGlyph?: 'cold' | 'late' | 'rush' | 'notes' | 'none';
  focusZones: FocusZone[];
}

export interface LocalizedScenarioCopy {
  title: string;
  contextLabel: string;
  sceneALabel?: string;
  sceneBLabel?: string;
  statement?: string;
  question: string;
  options: [string, string, string, string];
  whatToObserve: string;
  whyContextMatters: string;
  commonPitfall: string;
}

export interface Scenario {
  id: string;
  mode: TrainingMode;
  category: CueCategory;
  scene: SceneSpec;
  baselineScene?: SceneSpec;
  correctIndex: 0 | 1 | 2 | 3;
  translations: Record<LangCode, LocalizedScenarioCopy>;
}

export interface CategoryStats {
  attempted: number;
  correct: number;
}

export interface AttemptRecord {
  id: string;
  scenarioId: string;
  mode: TrainingMode;
  category: CueCategory;
  correct: boolean;
  responseMs: number;
  timestamp: number;
}

export interface ProgressState {
  totalAnswered: number;
  totalCorrect: number;
  totalResponseMs: number;
  currentStreak: number;
  bestStreak: number;
  byCategory: Record<CueCategory, CategoryStats>;
  recentHistory: AttemptRecord[];
}
