import { ACTIVE_DICTIONARY_TYPE } from '../constants/dictionary';
import type { RemoteWord, Word } from './word';

export type Dictionary = Record<string, Word>;
export type RemoteDictionary = Record<string, RemoteWord>;

export type PublicDictionary = {
    id: string;
    title: string;
    wordsCount: number;
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
        dictionary: RemoteDictionary;
    };

export type DictionaryWordsResponse = {
    dictionary: {
        id: string;
        title: string;
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

