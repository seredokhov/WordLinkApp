import {useEffect} from "react";

export { useEffect } from 'react';

export const useDisableBackGesture = navigation => {
    useEffect(() => {
        const preventGoBack = nav => {
            if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
                nav.preventDefault();
            }
        };

        navigation.addListener('beforeRemove', preventGoBack);

        return () => {
            navigation.removeListener('beforeRemove', preventGoBack);
        }
    }, [navigation]);
};
