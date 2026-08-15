import { createContext } from 'react';
import { AppContextValue } from '../types';

export const ContextApp = createContext<AppContextValue | null>(null);