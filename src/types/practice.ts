import { Word } from './word';

export type PracticeCard = {
    entity: Word;
    suggestions: string[];
    translation: string;
};