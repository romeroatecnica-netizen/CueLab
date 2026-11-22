import type {LangCode} from '../types/cuelab';
import {EDITORIAL_PART_1, type EditorialContent} from './editorialPart1';
import {EDITORIAL_PART_2} from './editorialPart2';

export type {EditorialContent, GuidePillar, MisconceptionRow, FaqItem, BookResource} from './editorialPart1';

export const EDITORIAL_TRANSLATIONS: Record<LangCode, EditorialContent> = {
  ...EDITORIAL_PART_1,
  ...EDITORIAL_PART_2,
};
