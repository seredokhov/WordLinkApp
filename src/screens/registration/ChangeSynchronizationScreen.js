import React from 'react';
import RegistrationGuide from '../../components/form/registration-guide';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/button';
import UserService from '../../services/user-service';
import AsyncStorageService from '../../services/async-storage-service';
import { Init, Login, SetError } from '../../store/actions';
import { errorHandler } from '../../utils';
import { useAppContext } from '../../store/context';
import { COLORS } from '../../constants/theme';

const ChangeSynchronizationScreen = props => {
    const { route } = props;
    const { name, login, password } = route.params;
    const { store: { dictionary }, dispatch } = useAppContext();

    const createUser = async isDataSynchronized => {
        const body = {
            password,
            name,
            login,
            isDataSynchronized
        };

        UserService.createUser(body)
            .then(user => {
                Promise
                    .all([
                        AsyncStorageService.setUser(user),
                        AsyncStorageService.setDictionary(dictionary)
                    ])
                    .then(() =>{
                        dispatch(Login(user));
                        dispatch(Init(dictionary));
                    });
            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    return (
        <View style={styles.screen}>
            <RegistrationGuide title="Do you want to sync your progress with the database?">
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonWrap}>
                        <Button
                            text="No"
                            backgroundColor={COLORS.darkGray}
                            onPress={() => createUser(false)}
                        />
                    </View>
                    <View style={styles.buttonWrap}>
                        <Button
                            text="Yes"
                            onPress={() => createUser(true)}
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrap: {
        width: '45%'
    },
});

export default ChangeSynchronizationScreen;
