import { AppState, Dictionary } from '../types';
import { Action } from '../types';

export const initialState: AppState = {
    user: null,
    dictionary: {},
    isLoadedAppData: false,
    filterMask: '',
    selectedWord: {},
    alertMessage: null,
    isOnline: false
};

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: {
                    ...action.payload
                }
            };
        case 'LOGOUT':
            return {
                ...initialState,
                isOnline: state.isOnline
            };
        case 'INIT':
            return {
                ...state,
                dictionary: {
                    ...action.payload
                },
                isLoadedAppData: true
            };
        case 'ADD_WORD': {
            const wordData = action.payload;

            return {
                ...state,
                dictionary: {
                    ...state.dictionary,
                    [wordData.word]: {
                        ...wordData
                    }
                },
                selectedWord: wordData,
                filterMask: initialState.filterMask
            };
        }
        case 'UPDATE_WORD': {
            const { oldWordName, newWordData } = action.payload;
            const { [oldWordName]: removed, ...restDictionary } = state.dictionary;

            return {
                ...state,
                dictionary: {
                    ...restDictionary,
                    [newWordData.word]: newWordData
                },
                selectedWord: newWordData
            };
        }
        case 'MERGE_WORDS': {
            const { created, updated } = action.payload;

            let updatedDictionary = { ...state.dictionary };

            updated.forEach(entity => {
                const { oldWordName, newWordData } = entity;
                const { [oldWordName]: deleted, ...otherDictionary } = updatedDictionary;

                updatedDictionary = {
                    [newWordData.word]: newWordData,
                    ...otherDictionary
                };
            });

            const newWords: Dictionary = {};

            created.forEach(entity => {
                newWords[entity.word] = {
                    ...entity
                };
            });

            return {
                ...state,
                dictionary: {
                    ...updatedDictionary,
                    ...newWords
                }
            };
        }
        case 'DELETE_WORD': {
            const { [action.payload]: deleted, ...other } = state.dictionary;
            return {
                ...state,
                dictionary: {
                    ...other
                },
                selectedWord: initialState.selectedWord
            };
        }
        case 'SELECT_WORD':
            return {
                ...state,
                selectedWord: action.payload
            };
        case 'FILTER':
            return {
                ...state,
                filterMask: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                alertMessage: action.payload
            };
        case 'UPDATE_USER': {
            return  {
                ...state,
                user: {
                    ...action.payload
                }
            };
        }
        case 'TOGGLE_INTERNET_CONNECTION':
            return {
                ...state,
                isOnline: action.payload
            };
        default:
            return state;
    }
};
