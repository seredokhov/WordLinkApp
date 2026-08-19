export type Word = {
    id?: string;
    word: string;
    translate: string;
    progress: number;
    lastUpdate: string | number;
    isLearned: boolean;
    isFavorite: boolean;
};

export type Dictionary = Record<string, Word>;

export type PublicDictionary = {
    id: string;
    title: string;
    wordsCount: number;
};

export type MergeWordsRequest = {
    wordsToCreate: Word[];
    wordsToUpdate: Word[];
};

export type CreateWordRequest = Omit<Word, 'id'> & { id?: string };

export type WordUpdateResult = {
    oldWordName: string;
    newWordData: Word;
};

export type MergeWordsResponse = {
    created: Word[];
    updated: WordUpdateResult[];
};

export type WordsToSynchronize = {
    toCreate: Dictionary | null;
    toUpdate: Dictionary | null;
    toDownload: Dictionary | null;
};