import React, { useEffect, useMemo, useReducer } from 'react';
import { COLORS } from './src/constants/theme';
import { ContextApp } from './src/store/context';
import { StatusBar } from 'react-native';
import { reducer, initialState } from './src/store/reducer';
import AlertModal from './src/components/modal/alert-modal';
import { LogBox } from 'react-native';
import AppNavigator from "./src/navigators/AppNavigator";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { ToggleInternetConnection } from "./src/store/actions";

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App = () => {
    const [store, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        NetInfo.addEventListener((state: NetInfoState) => {
            dispatch(ToggleInternetConnection(state.isConnected || false));
        });
    }, []);

    const contextValue = useMemo(() => ({ store, dispatch }), [store]);

    return (
        <ContextApp.Provider value={contextValue}>
            <StatusBar backgroundColor={COLORS.lightRed} />
            <AppNavigator />
            <AlertModal />
        </ContextApp.Provider>
    );
};

export default App;
