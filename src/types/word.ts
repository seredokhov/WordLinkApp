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

//requests
export type MergeWordsRequest = {
    wordsToCreate: Word[];
    wordsToUpdate: Word[];
};
export type CreateWordRequest = Omit<Word, 'id'> & { id?: string };

// responses
export type WordUpdateResult = {
    oldWordName: string;
    newWordData: Word;
};
export type MergeWordsResponse = {
    created: Word[];
    updated: WordUpdateResult[];
};

// sync
export type WordsToSynchronize = {
    toCreate: Dictionary | null;
    toUpdate: Dictionary | null;
    toDownload: Dictionary | null;
};