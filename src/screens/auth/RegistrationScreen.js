import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import Header from '../../components/header';
import RegistrationNavigator from '../../navigators/RegistrationNavigator';

const RegistrationScreen = props => {
    const { navigation } = props;

    const back = () => {
        navigation.navigate('GetStarted');
    };

    return (
        <View style={styles.page}>
            <Header
                onLeftBtnPress={back}
            >
                <Text style={styles.title}>Registration</Text>
            </Header>
            <RegistrationNavigator />
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
    }
});

export default RegistrationScreen;
