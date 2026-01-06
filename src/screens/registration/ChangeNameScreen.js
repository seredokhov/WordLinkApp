import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import RegistrationGuide from '../../components/form/registration-guide';
import Input from '../../components/input';
import Button from '../../components/button';

const ChangeNameScreen = props => {
    const { route, navigation } = props;
    const [nameValue, setNameValue] = useState('');

    const params = {
        ...route.params,
        name: nameValue
    };

    const back = () => {
        navigation.goBack();
    };

    const next = () => {
        navigation.navigate('ChangePassword', params);
    };

    return (
        <View style={styles.screen}>
            <RegistrationGuide title="Your name:">
                <View style={styles.inputWrap}>
                    <Input
                        value={nameValue}
                        placeholder="Name..."
                        onChangeText={setNameValue}
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
                            disabled={nameValue.length < 4}
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

export default ChangeNameScreen;
