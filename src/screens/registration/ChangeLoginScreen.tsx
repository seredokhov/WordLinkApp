import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import Input from '../../components/input';
import Button from '../../components/button';
import RegistrationGuide from '../../components/form/registration-guide';
import { ChangeLoginScreenProps } from '../../types';

const ChangeLoginScreen = (props: ChangeLoginScreenProps) => {
    const { navigation } = props;
    const [loginValue, setLoginValue] = useState('');

    const next = () => {
        navigation.navigate('ChangeName', { login: loginValue });
    };

    return (
        <View style={styles.screen}>
            <RegistrationGuide title="Your login:">
                <View style={styles.inputWrap}>
                    <Input
                        value={loginValue}
                        placeholder="Login..."
                        onChangeText={setLoginValue}
                    />
                </View>
                <Button
                    disabled={loginValue.length < 4}
                    text={'Next'}
                    onPress={next}
                />
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
    }
});

export default ChangeLoginScreen;
