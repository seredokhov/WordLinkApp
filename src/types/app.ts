import { User } from './user';
import { Dictionary, Word } from './word';
import { Dispatch } from 'react';
import { Action } from './store';

export type AppState = {
    user: User | null;
    dictionary: Dictionary;
    isLoadedAppData: boolean;
    filterMask: string;
    selectedWord: Word | Record<string, never>;
    alertMessage: string | null;
    isOnline: boolean;
};

export type AppContextValue = {
    store: AppState;
    dispatch: Dispatch<Action>;
};