import { ActionOf, ActionType, PayloadOf } from '../types';

const createAction = <T extends Exclude<ActionType, 'LOGOUT'>>(type: T) =>
    (payload: PayloadOf<T>): ActionOf<T> =>
        ({ type, payload }) as ActionOf<T>;

export const Logout = (): ActionOf<'LOGOUT'> => ({ type: 'LOGOUT' });
export const Login = createAction('LOGIN');
export const Init = createAction('INIT');
export const AddWord = createAction('ADD_WORD');
export const UpdateWord = createAction('UPDATE_WORD');
export const DeleteWord = createAction('DELETE_WORD');
export const SelectWord = createAction('SELECT_WORD');
export const MergeWords = createAction('MERGE_WORDS');
export const Filter = createAction('FILTER');
export const SetError = createAction('SET_ERROR');
export const UpdateUser = createAction('UPDATE_USER');
export const SetActiveDictionary = createAction('SET_ACTIVE_DICTIONARY');
export const ToggleInternetConnection = createAction('TOGGLE_INTERNET_CONNECTION');
