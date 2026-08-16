import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import RegistrationGuide from '../../components/form/registration-guide';
import Input from '../../components/input';
import Button from '../../components/button';
import { ChangePasswordScreenProps } from '../../types';

const ChangePasswordScreen = (props: ChangePasswordScreenProps) => {
    const { route, navigation } = props;
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const isSubmitButtonDisabled = passwordValue.length < 5 ||
        (passwordValue !== confirmPasswordValue);

    const params = {
        ...route.params,
        password: passwordValue
    };

    const back = () => {
        navigation.goBack();
    };

    const next = () => {
        navigation.navigate('ChangeSynchronization', params);
    };

    return (
        <View style={styles.screen}>
            <RegistrationGuide title="Your password:">
                <View style={styles.inputWrap}>
                    <Input
                        value={passwordValue}
                        placeholder="Password..."
                        onChangeText={setPasswordValue}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Input
                        value={confirmPasswordValue}
                        placeholder="Confirm password..."
                        onChangeText={setConfirmPasswordValue}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonWrap}>
                        <Button
                            text="Back"
                            backgroundColor={COLORS.darkGray}
                            onPress={back}
                        />
                    </View>
                    <View style={styles.buttonWrap}>
                        <Button
                            disabled={isSubmitButtonDisabled}
                            text="Next"
                            onPress={next}
                        />
                    </View>
                </View>
            </RegistrationGuide>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.lightRed,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputWrap: {
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrap: {
        width: '45%'
    },
});

export default ChangePasswordScreen;
