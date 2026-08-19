import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
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
import { Dictionary, PracticeCard, PracticeScreenProps, User } from '../../types';
import { HeaderIconAction } from '../../components/header/actions';
import { ACTIVE_DICTIONARY_TYPE } from '../../constants/dictionary';

export const TESTS_LIMIT = 3;
const WORDS_LIMIT = 10;
const TRANSLATIONS_LIMIT = 6;

const PracticeScreen = (props: PracticeScreenProps) => {
    const { navigation } = props;
    const { store: { dictionary, user, isOnline, activeDictionary }, dispatch } = useAppContext();
    const { allowedTests = 0 } = user || {};
    const [words, setWords] = useState<PracticeCard[]>([]);
    const [unlearnedWordsCount, setUnlearnedWordsCount] = useState<number>(0);
    const isFocused = useIsFocused();
    const isRemoteDictionary = activeDictionary.type === ACTIVE_DICTIONARY_TYPE.REMOTE;

    const navigateToProfile = (): void => {
        navigation.navigate('Profile');
    };

    const localUpdateUser = (newUser: User) => {
        AsyncStorageService.setUser(newUser)
            .then(() => dispatch(UpdateUser(newUser)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const updateUser = (newUser: User) => {
        if (!user) {
            return;
        }

        if (isOnline && user.isDataSynchronized && user.token) {
            UserService.updateUser(newUser, user.token)
                .then(() => localUpdateUser(newUser))
                .catch(err => dispatch(SetError(errorHandler(err))));

            return;
        }

        localUpdateUser(newUser);
    };

    const startTest = () => {
        if (!user) {
            return;
        }

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

    const saveResults = (correctWords: Dictionary[]) => {
        const wordsToUpdate: Dictionary = Object.assign({}, ...correctWords);
        const updatedDictionary = {
            ...dictionary,
            ...wordsToUpdate
        };

        if (isOnline && user?.isDataSynchronized && user?.token) {
            WordService.saveResults(wordsToUpdate, user.token)
                .catch(err => dispatch(SetError(errorHandler(err))));
        }

        AsyncStorageService.setDictionary(updatedDictionary)
            .then(() => dispatch(Init(updatedDictionary)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const back = () => {
        navigation.navigate('Home');
    };

    const navigateToStartPage = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'GetStarted'
            })
        );
    };

    useEffect(() => {
        if (isRemoteDictionary || !isFocused || !user?.token) {
            return;
        }

        getCards();
    }, [isFocused, dictionary, isRemoteDictionary, user?.token]);

    useEffect(() => {
        if (isRemoteDictionary || !user || !user.token) {
            return;
        }

        if (!user.lastTestDate) {
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
    }, [isRemoteDictionary, user]);

    const renderContent = () => {
        if (isRemoteDictionary) {
            return <View />;
        }

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
                onStart={startTest}
                onReset={getCards}
                onFinish={saveResults}
            />
        );
    };

    return (
        <View style={styles.page}>
            <BorderedHeader
                leftContent={<HeaderIconAction icon="arrow-back-outline" onPress={back} />}
                rightContent={<HeaderIconAction icon="person-circle" onPress={navigateToProfile} bordered />}
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
