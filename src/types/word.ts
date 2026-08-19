export type BaseWord = {
    id?: string;
    word: string;
    translate: string;
};

export type RemoteWord = BaseWord;

export type Word = BaseWord & {
    progress: number;
    lastUpdate: string | number;
    isLearned: boolean;
    isFavorite: boolean;
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