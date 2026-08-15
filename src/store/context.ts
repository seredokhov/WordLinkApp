import { createContext, useContext } from 'react';
import { AppContextValue } from '../types';

export const useAppContext = (): AppContextValue => {
    const context = useContext(ContextApp);

    if (context === null) {
        throw new Error('useAppContext must be used within ContextApp.Provider');
    }
    return context;
};

export const ContextApp = createContext<AppContextValue | null>(null);