import { User } from './user.ts';
import { Dictionary, Word } from './word.ts';

export type AppState = {
    user: User | null;
    dictionary: Dictionary;
    isLoadedAppData: boolean;
    filterMask: string;
    selectedWord: Word | Record<string, never>;
    alertMessage: string | null;
    isOnline: boolean;
};