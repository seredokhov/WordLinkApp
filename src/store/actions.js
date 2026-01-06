export const Init = payload => {
    return {
        type: 'INIT',
        payload: payload
    };
};

export const Login = payload => {
    return {
        type: 'LOGIN',
        payload: payload
    };
};

export const Logout = payload => {
    return {
        type: 'LOGOUT',
        payload: payload
    };
};

export const AddWord = payload => {
    return {
        type: 'ADD_WORD',
        payload: payload
    };
};

export const UpdateWord = payload => {
    return {
        type: 'UPDATE_WORD',
        payload: payload
    };
};

export const DeleteWord = payload => {
    return {
        type: 'DELETE_WORD',
        payload: payload
    };
};

export const SelectWord = payload => {
    return {
        type: 'SELECT_WORD',
        payload: payload
    };
};

export const MergeWords = payload => {
    return {
        type: 'MERGE_WORDS',
        payload: payload
    };
};

export const Filter = payload => {
    return {
        type: 'FILTER',
        payload: payload
    };
};

export const SetError = payload => {
    return {
        type: 'SET_ERROR',
        payload: payload
    };
};

export const UpdateUser = payload => {
    return {
        type: 'UPDATE_USER',
        payload: payload
    };
};

export const ToggleInternetConnection = payload => {
    return {
        type: 'TOGGLE_INTERNET_CONNECTION',
        payload: payload
    };
};

export default {
    Init,
    Login,
    Logout,
    AddWord,
    UpdateWord,
    DeleteWord,
    MergeWords,
    SelectWord,
    UpdateUser,
    Filter,
    ToggleInternetConnection
};
