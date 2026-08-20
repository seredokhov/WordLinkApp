import { ACTIVE_DICTIONARY_TYPE } from '../constants/dictionary';
import type { RemoteWord, Word } from './word';

export type Dictionary = Record<string, Word>;
export type RemoteDictionary = Record<string, RemoteWord>;

export type DictionaryProgress = {
    bestCorrectAnswers: number;
    bestProgressPercent: number;
    lastCorrectCount: number;
    lastTestDate: string | null;
};

export type PublicDictionary = {
    id: string;
    title: string;
    wordsCount: number;
    theme?: string;
    progress?: DictionaryProgress;
};

export type ActiveDictionary =
    | {
        id: string;
        type: typeof ACTIVE_DICTIONARY_TYPE.LOCAL;
        title: string;
        dictionary: Dictionary;
    }
    | {
        id: string;
        type: typeof ACTIVE_DICTIONARY_TYPE.REMOTE;
        title: string;
        theme: string;
        dictionary: RemoteDictionary;
        progress?: DictionaryProgress;
    };

export type DictionaryWordsResponse = {
    dictionary: {
        id: string;
        title: string;
        theme: string;
        createdAt: string;
    };
    words: (RemoteWord & {
        dictionaryId?: string;
        createdAt?: string;
    })[];
};

export type WordsToSynchronize = {
    toCreate: Dictionary | null;
    toUpdate: Dictionary | null;
    toDownload: Dictionary | null;
};

export type SaveDictionaryProgressRequest = {
    correctCount: number;
    totalWords: number;
};

export type DictionaryProgressResponse = DictionaryProgress & {
    id: string;
    userId: string;
    dictionaryId: string;
    dictionaryTitle: string | null;
    dictionaryTheme?: string | null;
    totalWords: number;
};

