import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import { getRandomEntities, errorHandler } from '../../utils';
import Content from '../../components/content';
import BorderedHeader from '../../components/header/bordered-header';
import PracticeContainer from '../../components/practice/practice-container';
import RemotePracticeContainer from '../../components/practice/remote-practice-container';
import WordService from '../../services/word-service';
import AsyncStorageService from '../../services/async-storage-service';
import { Init, SetActiveDictionary, SetError, UpdateUser } from '../../store/actions';
import { useIsFocused } from '@react-navigation/native';
import UserService from '../../services/user-service';
import DictionaryService from '../../services/dictionary-service';
import { Dictionary, PracticeCard, PracticeScreenProps, User } from '../../types';
import { HeaderIconAction } from '../../components/header/actions';
import { ACTIVE_DICTIONARY_TYPE } from '../../constants/dictionary';
import { TESTS_LIMIT, TRANSLATIONS_LIMIT, WORDS_LIMIT } from '../../constants/practice';
import AuthRequired from '../../components/auth-required';

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

    const saveRemoteResults = (correctCount: number, totalWords: number) => {
        if (
            !user?.token ||
            !user.id ||
            activeDictionary.type !== ACTIVE_DICTIONARY_TYPE.REMOTE
        ) {
            return;
        }

        DictionaryService.saveDictionaryProgress(
            user.id,
            activeDictionary.id,
            {
                correctCount,
                totalWords
            },
            user.token
        )
            .then((progressResponse) => {
                dispatch(SetActiveDictionary({
                    ...activeDictionary,
                    progress: {
                        bestCorrectAnswers: progressResponse.bestCorrectAnswers,
                        bestProgressPercent: progressResponse.bestProgressPercent,
                        lastCorrectCount: progressResponse.lastCorrectCount,
                        lastTestDate: progressResponse.lastTestDate
                    }
                }));
            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const back = () => {
        navigation.navigate('Home');
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
        if (!user?.token) {
            return <AuthRequired />;
        }

        if (isRemoteDictionary) {
            if (Object.keys(activeDictionary.dictionary).length === 0) {
                return (
                    <View>
                        <Text style={styles.messageTitle}>Dictionary is empty.</Text>
                        <Text style={styles.message}>
                            This dictionary has no words to practice yet.
                        </Text>
                    </View>
                );
            }

            return (
                <RemotePracticeContainer
                    dictionary={activeDictionary.dictionary}
                    title={activeDictionary.title}
                    theme={activeDictionary.theme || activeDictionary.title}
                    onFinish={saveRemoteResults}
                />
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
                rightContent={<HeaderIconAction icon="person-circle" onPress={navigateToProfile} />}
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
    }
});

export default PracticeScreen;
