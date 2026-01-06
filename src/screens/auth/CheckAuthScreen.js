import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ContextApp } from '../../store/context';
import { COLORS } from '../../constants/theme';
import { CommonActions } from '@react-navigation/native';
import AsyncStorageService from '../../services/async-storage-service';
import { Init, Login, SetError } from '../../store/actions';

const CheckAuthScreen = props => {
    const { navigation } = props;
    const { store: { user, isLoadedAppData }, dispatch } = useContext(ContextApp);

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
            navigation.navigate('GetStarted');
            return;
        }

        navigation.dispatch(
            CommonActions.navigate({
                name: 'App'
            })
        );

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
