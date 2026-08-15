import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContextApp } from '../../store/context';
import {Init, Login, SetError} from '../../store/actions';
import UserService from '../../services/user-service';
import AsyncStorageService from '../../services/async-storage-service';
import WordService from '../../services/word-service';
import Input from '../input';
import Button from '../button';
import { errorHandler } from '../../utils';

const LoginForm = () => {
    const { dispatch } = useContext(ContextApp);
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const isButtonActive = loginValue.length >  3 && passwordValue.length > 4;

    const login = () => {
        const body = {
            login: loginValue,
            password: passwordValue
        };

        UserService.login(body)
            .then(user => {
                WordService.getDictionary(user.token)
                    .then(words => {
                        Promise.all([
                            AsyncStorageService.deleteAllData(),
                            AsyncStorageService.setUser(user),
                            AsyncStorageService.setDictionary(words),
                        ]).then(() => {
                            dispatch(Login(user));
                            dispatch(Init(words));
                        });
                    });

            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    return (
        <View style={styles.formWrap}>
            <View style={styles.inputWrap}>
                <Input
                    value={loginValue}
                    placeholder="Login..."
                    onChangeText={setLoginValue}
                />
            </View>
            <View style={styles.inputWrap}>
                <Input
                    value={passwordValue}
                    placeholder="Password..."
                    onChangeText={setPasswordValue}
                    secureTextEntry
                />
            </View>
            <Button
                disabled={!isButtonActive}
                text="Continue"
                onPress={login}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        marginBottom: 10
    },
    formWrap: {
        width: 300
    }
});

export default LoginForm;
