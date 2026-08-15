import { Dictionary, MergeWordsResponse, Word, WordUpdateResult } from './word';
import { User } from './user';

export type Action =
    | { type: 'INIT'; payload: Dictionary }
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'ADD_WORD'; payload: Word }
    | { type: 'UPDATE_WORD'; payload: WordUpdateResult }
    | { type: 'DELETE_WORD'; payload: string }
    | { type: 'SELECT_WORD'; payload: Word | Record<string, never> }
    | { type: 'MERGE_WORDS'; payload: MergeWordsResponse }
    | { type: 'FILTER'; payload: string }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'TOGGLE_INTERNET_CONNECTION'; payload: boolean };

export type ActionType = Action['type'];

export type PayloadOf<T extends Exclude<ActionType, 'LOGOUT'>> =
    Extract<Action, { type: T }>['payload'];

export type ActionOf<T extends ActionType> = Extract<Action, { type: T }>;