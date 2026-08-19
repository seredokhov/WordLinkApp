import { ActiveDictionary, AppState, Dictionary } from '../types';
import { Action } from '../types';
import { ACTIVE_DICTIONARY_TYPE, MY_DICTIONARY_ID } from '../constants/dictionary';

const createLocalActiveDictionary = (dictionary: Dictionary): ActiveDictionary => ({
    id: MY_DICTIONARY_ID,
    type: ACTIVE_DICTIONARY_TYPE.LOCAL,
    title: 'My Dictionary',
    dictionary,
});

export const initialState: AppState = {
    user: null,
    dictionary: {},
    activeDictionary: createLocalActiveDictionary({}),
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
                activeDictionary: state.activeDictionary.type === ACTIVE_DICTIONARY_TYPE.LOCAL
                    ? createLocalActiveDictionary({
                        ...action.payload
                    })
                    : state.activeDictionary,
                isLoadedAppData: true
            };
        case 'SET_ACTIVE_DICTIONARY':
            return {
                ...state,
                activeDictionary: action.payload,
                selectedWord: initialState.selectedWord,
            };
        case 'ADD_WORD': {
            const wordData = action.payload;
            const nextDictionary = {
                ...state.dictionary,
                [wordData.word]: {
                    ...wordData
                }
            };

            return {
                ...state,
                dictionary: nextDictionary,
                activeDictionary: state.activeDictionary.type === ACTIVE_DICTIONARY_TYPE.LOCAL
                    ? createLocalActiveDictionary(nextDictionary)
                    : state.activeDictionary,
                selectedWord: wordData,
                filterMask: initialState.filterMask
            };
        }
        case 'UPDATE_WORD': {
            const { oldWordName, newWordData } = action.payload;
            const { [oldWordName]: removed, ...restDictionary } = state.dictionary;
            const nextDictionary = {
                ...restDictionary,
                [newWordData.word]: newWordData
            };

            return {
                ...state,
                dictionary: nextDictionary,
                activeDictionary: state.activeDictionary.type === ACTIVE_DICTIONARY_TYPE.LOCAL
                    ? createLocalActiveDictionary(nextDictionary)
                    : state.activeDictionary,
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

            const nextDictionary = {
                ...updatedDictionary,
                ...newWords
            };

            return {
                ...state,
                dictionary: nextDictionary,
                activeDictionary: state.activeDictionary.type === ACTIVE_DICTIONARY_TYPE.LOCAL
                    ? createLocalActiveDictionary(nextDictionary)
                    : state.activeDictionary,
            };
        }
        case 'DELETE_WORD': {
            const { [action.payload]: deleted, ...other } = state.dictionary;
            return {
                ...state,
                dictionary: {
                    ...other
                },
                activeDictionary: state.activeDictionary.type === ACTIVE_DICTIONARY_TYPE.LOCAL
                    ? createLocalActiveDictionary({
                        ...other
                    })
                    : state.activeDictionary,
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
