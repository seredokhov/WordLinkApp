import { User } from './user';
import { Word } from './word';
import type { ActiveDictionary, Dictionary } from './dictionary';
import { Dispatch } from 'react';
import { Action } from './store';

export type AppState = {
    user: User | null;
    dictionary: Dictionary;
    activeDictionary: ActiveDictionary;
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