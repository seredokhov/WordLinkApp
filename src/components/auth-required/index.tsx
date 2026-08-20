import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import Button from '../button';

const AuthRequired = () => {
    const navigation = useNavigation();

    const navigateToStartPage = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'GetStarted'
            })
        );
    };

    return (
        <View style={styles.wrap}>
            <Text style={styles.message}>Create account or login for unblock this functionality</Text>
            <View style={styles.buttonsContainer}>
                <Button
                    text="Create Account"
                    backgroundColor={COLORS.lightRed}
                    onPress={navigateToStartPage}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsContainer: {
        width: 220
    }
});

export default AuthRequired;
