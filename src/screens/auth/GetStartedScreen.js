import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { GUEST } from '../../constants/access';
import { useAppContext } from '../../store/context';
import AsyncStorageService from '../../services/async-storage-service';
import { Login, Init, Logout } from '../../store/actions';
import Button from '../../components/button';
import { useIsFocused } from '@react-navigation/native';

const GetStartedScreen = props => {
    const { navigation } = props;
    const { store: { user }, dispatch } = useAppContext();
    const isFocused = useIsFocused();

    const loginLikeGuest = async () => {
        const storageData = await AsyncStorageService.getDictionary();

        await AsyncStorageService.setUser(GUEST);

        dispatch(Init(storageData));
        dispatch(Login(GUEST));
    };

    useEffect(() => {
        if (!isFocused) {
            return;
        }

        if (user?.token) {
            AsyncStorageService.deleteAllData();
        }
        dispatch(Logout());
    },[isFocused])

    return (
        <View style={styles.page}>
            <Text style={styles.title}>WorLink</Text>
            <View style={styles.buttonWrap}>
                <Button
                    text="Sign In"
                    backgroundColor={COLORS.lighterRed}
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
            <View style={styles.buttonWrap}>
                <Button
                    text="Sign Up"
                    backgroundColor={COLORS.lighterRed}
                    onPress={() => navigation.navigate('Registration')}
                />
            </View>
            <View style={styles.buttonWrap}>
                <Button
                    text="Guest"
                    backgroundColor={COLORS.darkGray}
                    underlayColor={COLORS.darkerGray}
                    onPress={loginLikeGuest}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.lightRed,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'sans-serif-condensed',
        color: COLORS.white,
        marginBottom: 15,
        textAlign: 'center'
    },
    buttonWrap: {
        width: 200,
        marginBottom: 10
    }
});

export default GetStartedScreen;
