import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { ContextApp } from '../../store/context';
import { getRandomEntities, errorHandler } from '../../utils';
import Content from '../../components/content';
import BorderedHeader from '../../components/header/bordered-header';
import PracticeContainer from '../../components/practice/practice-container';
import WordService from '../../services/word-service';
import AsyncStorageService from '../../services/async-storage-service';
import { Init, SetError, UpdateUser } from '../../store/actions';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import Button from '../../components/button';
import UserService from '../../services/user-service';

export const TESTS_LIMIT = 3;
const WORDS_LIMIT = 10;
const TRANSLATIONS_LIMIT = 6;

const PracticeScreen = props => {
    const { navigation } = props;
    const { store: { dictionary, user, isOnline }, dispatch } = useContext(ContextApp);
    const { allowedTests } = user || {};
    const [words, setWords] = useState([]);
    const [unlearnedWordsCount, setUnlearnedWordsCount] = useState(0);
    const isFocused = useIsFocused();

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const localUpdateUser = newUser => {
        AsyncStorageService.setUser(newUser)
            .then(() => dispatch(UpdateUser(newUser)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const updateUser = newUser => {
        if (isOnline && user.isDataSynchronized && user.token) {
            UserService.updateUser(newUser, user.token)
                .then(() => localUpdateUser(newUser))
                .catch(err => dispatch(SetError(errorHandler(err))));

            return;
        }

        localUpdateUser(newUser);
    };

    const startTest = () => {
        const newUser = {
            ...user,
            allowedTests: allowedTests > 0 ? allowedTests - 1 : 0,
            lastTestDate: new Date().toISOString()
        };

        updateUser(newUser);
    };

    const getCards = () => {
        const filteredEntities = Object.entries(dictionary).filter(([, val]) => !val.isLearned);
        const unlearnedWords = Object.fromEntries(filteredEntities);
        const randomWords = getRandomEntities(unlearnedWords, WORDS_LIMIT, TRANSLATIONS_LIMIT);

        setUnlearnedWordsCount(Object.keys(unlearnedWords).length)
        setWords(randomWords);
    };

    const saveResults = correctWords => {
        const wordsToUpdate = {};

        correctWords.forEach(item => {
            const [[key, value]] = Object.entries(item);
            wordsToUpdate[key] = value;
        });

        const updatedDictionary = {
            ...dictionary,
            ...wordsToUpdate
        };

        if (isOnline && user.isDataSynchronized && user.token) {
            WordService.saveResults(wordsToUpdate, user.token)
                .catch(err => dispatch(SetError(errorHandler(err))));
        }

        AsyncStorageService.setDictionary(updatedDictionary)
            .then(() => dispatch(Init(updatedDictionary)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const back = () => {
        navigation.navigate({ name: 'Home' });
    };

    const navigateToStartPage = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'GetStarted'
            })
        );
    };

    useEffect(() => {
        if (!isFocused || !user?.token) {
            return;
        }

        getCards();
    }, [isFocused, dictionary]);

    useEffect(() => {
        if (!user?.token) {
            return;
        }

        const lastTestDay = new Date(user.lastTestDate).getUTCDate();
        const currentDay = new Date().getUTCDate();

        if (lastTestDay === currentDay) {
            return;
        }

        const newUser = {
            ...user,
            allowedTests: TESTS_LIMIT,
        };

        updateUser(newUser);
    }, []);

    const renderContent = () => {
        if (!user?.token) {
            return (
                <Fragment>
                    <Text style={styles.message}>Create account or login for unblock this functionality</Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            text="Create Account"
                            backgroundColor={COLORS.lightRed}
                            onPress={navigateToStartPage}
                        />
                    </View>
                </Fragment>
            );
        }

        if (words.length < WORDS_LIMIT) {
            return (
                <View>
                    <Text style={styles.messageTitle}>Words are not enough.</Text>
                    <Text style={styles.message}>
                        {`Add more than ${WORDS_LIMIT} words to the dictionary to be able to participate in test.`}
                    </Text>
                </View>
            );
        }

        return (
            <PracticeContainer
                words={words}
                allowedTestsCount={allowedTests}
                unlearnedWordsCount={unlearnedWordsCount}
                dictionary={dictionary}
                onStart={startTest}
                onReset={getCards}
                onFinish={saveResults}
            />
        );
    };

    return (
        <View style={styles.page}>
            <BorderedHeader
                onLeftBtnPress={back}
                rightBtnIcon="person-circle"
                onRightBtnPress={navigateToProfile}
            >
                <Text style={styles.title}>Practice</Text>
            </BorderedHeader>
            <Content>
                <View style={styles.wrap}>
                    {renderContent()}
                </View>
            </Content>
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
    page: {
        flex: 1,
        backgroundColor: COLORS.lighterGray,
    },
    title: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    messageTitle: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
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

export default PracticeScreen;
