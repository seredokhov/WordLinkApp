import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppContext } from '../../store/context';
import { COLORS } from '../../constants/theme';
import AsyncStorageService from '../../services/async-storage-service';
import { Init, Login, SetError } from '../../store/actions';
import { CheckAuthScreenProps } from '../../types';
import { resetToApp } from '../../utils';

const CheckAuthScreen = (props: CheckAuthScreenProps) => {
    const { navigation } = props;
    const { store: { user, isLoadedAppData }, dispatch } = useAppContext();

    const checkAuth = async () => {
        const user = await AsyncStorageService.getUser();
        if (user) {
            dispatch(Login(user));
        }

        const storageData = await AsyncStorageService.getDictionary();

        dispatch(Init(storageData));
    };

    useEffect(() => {
        checkAuth().catch(err => dispatch(SetError(err)));
    }, []);

    useEffect(() => {
        if (!isLoadedAppData) {
            return;
        }

        if (!user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'GetStarted' }],
            });
            return;
        }

        resetToApp(navigation);
    }, [user, isLoadedAppData]);

    return (
        <View style={styles.page}>
            <Text style={styles.text}>WordLink</Text>
            <ActivityIndicator size={50} color={COLORS.white}/>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightRed
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'sans-serif-condensed',
        color: COLORS.white,
        marginBottom: 5
    }
});

export default CheckAuthScreen;
