import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PracticeStep from './practice-step';
import PracticeIntro from './practice-intro';
import RemotePracticeResults from './remote-practice-results';
import { getRandomEntities, noop } from '../../utils';
import { TRANSLATIONS_LIMIT } from '../../constants/practice';
import { PracticeCard, RemoteDictionary, RemoteWord } from '../../types';

type RemotePracticeContainerProps = {
    dictionary: RemoteDictionary;
    title: string;
    theme: string;
    onFinish?: (correctCount: number, totalWords: number) => void;
};

const defaultProps = {
    onFinish: noop
};

const RemotePracticeContainer = (props: RemotePracticeContainerProps) => {
    const { dictionary, title, theme, onFinish } = { ...defaultProps, ...props };
    const [words, setWords] = useState<PracticeCard<RemoteWord>[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isActiveTest, setActiveTest] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const hasSavedRef = useRef(false);
    const isFocused = useIsFocused();
    const wordsCount = Object.keys(dictionary).length;

    const getCards = () => {
        setWords(getRandomEntities(dictionary, Object.keys(dictionary).length, TRANSLATIONS_LIMIT));
    };

    const handlerStep = (result: { isCorrect: boolean }) => {
        if (!result.isCorrect) {
            return;
        }

        setCorrectAnswersCount((prev) => prev + 1);
    };

    const handlerLastStep = () => {
        setHasMore(false);
    };

    const handlerStartTest = () => {
        setActiveTest(true);
    };

    const handlerResetTest = () => {
        hasSavedRef.current = false;
        getCards();
        setCorrectAnswersCount(0);
        setHasMore(true);
    };

    const handlerFinishTest = () => {
        setActiveTest(false);
        handlerResetTest();
    };

    useEffect(() => {
        getCards();
    }, [dictionary]);

    useEffect(() => {
        if (!isFocused || !isActiveTest) {
            return;
        }

        setActiveTest(false);
        handlerResetTest();
    }, [isFocused]);

    useEffect(() => {
        if (hasMore || !isActiveTest || hasSavedRef.current) {
            return;
        }

        hasSavedRef.current = true;
        onFinish(correctAnswersCount, words.length);
    }, [hasMore, isActiveTest, correctAnswersCount, words.length]);

    if (!isActiveTest) {
        return (
            <PracticeIntro
                description={`Go through all words in Dictionary.`}
                stats={[
                    { label: 'Dictionary:', value: title },
                    { label: 'Theme:', value: theme },
                    { label: 'Words:', value: wordsCount },
                ]}
                onStart={handlerStartTest}
            />
        );
    }

    return (
        <View style={styles.wrap}>
            {hasMore ? (
                <PracticeStep
                    words={words}
                    onStep={handlerStep}
                    onFinish={handlerLastStep}
                />
            ) : (
                <RemotePracticeResults
                    answersCount={words.length}
                    correctAnswersCount={correctAnswersCount}
                    onReset={handlerResetTest}
                    onFinish={handlerFinishTest}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        width: 300,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default RemotePracticeContainer;
