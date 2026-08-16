import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import Header from '../../components/header';
import LoginForm from '../../components/form/login-form';
import { LoginScreenProps } from '../../types';

const LoginScreen = (props: LoginScreenProps) => {
    const { navigation } = props;

    const back = () => {
        navigation.navigate('GetStarted');
    };

    return (
        <View style={styles.page}>
            <Header onLeftBtnPress={back} >
                <Text style={styles.title}>Login</Text>
            </Header>
            <View style={styles.formContainer}>
                <LoginForm />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.lightRed
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center'
    },
    formContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default LoginScreen;
