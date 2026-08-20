import { BaseWord, Word } from './word';

export type PracticeCard<T extends BaseWord = Word> = {
    entity: T;
    suggestions: string[];
    translation: string;
};
