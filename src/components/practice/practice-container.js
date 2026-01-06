import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import PracticeStep from './practice-step';
import PracticeResults from './practice-results';
import { COLORS } from '../../constants/theme';
import { useIsFocused } from '@react-navigation/native';
import Button from '../button';
import Title from '../title';
import { TESTS_LIMIT } from '../../screens/main/PracticeScreen';

const PracticeContainer = props => {
    const {
        words,
        unlearnedWordsCount,
        allowedTestsCount,
        onStart,
        onReset,
        onFinish
    } = { ...defaultProps, ...props };

    const [hasMore, setHasMore] = useState(true);
    const [isActiveTest, setActiveTest] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [learnedWordsCount, setLearnedWordsCount] = useState(0);
    const [passedEntities, setPassedEntities] = useState([]);
    const isFocused = useIsFocused();

    const handlerStep = result => {
        if (!result.isCorrect) {
            return;
        }

        const { entity } = result;
        const isLastProgress = entity.progress === 2;

        let passedEntity = {
            [entity.word]: {
                ...entity,
                progress: entity.progress < 3 ? entity.progress + 1 : entity.progress,
                isLearned: isLastProgress ? true : entity.isLearned,
                lastUpdate: new Date()
            }
        };

        if (isLastProgress) {
            setLearnedWordsCount(prevState => prevState + 1);
        }

        setPassedEntities(prevState => [ ...prevState, passedEntity ]);
        setCorrectAnswersCount(prev => prev + 1);
    };

    const handlerLastStep = () => {
        setHasMore(false);
    };

    const handlerStartTest = () => {
        setActiveTest(true);
        onStart();
    };

    const handlerResetTest = () => {
        onReset();
        setCorrectAnswersCount(0);
        setLearnedWordsCount(0);
        setHasMore(true);
        setPassedEntities([]);
    };

    const handlerFinishTest = (isPassed) => {
        if (isPassed) {
            onFinish(passedEntities);
        }

        setActiveTest(false);
        handlerResetTest();
    };

    useEffect(() => {
        if (!isFocused || !isActiveTest) {
            return;
        }

        setActiveTest(false);
        handlerResetTest();
    }, [isFocused]);

    if (!isActiveTest) {
        return (
            <View style={styles.wrap}>
                <Title title="Practice" iconName="school" />
                <View style={styles.textBlock}>
                    <Text style={styles.description}>You can pass 3 tests per day to mark your words as learned.</Text>
                    <View style={styles.row}>
                        <Text style={styles.text}>Passed tests:</Text>
                        <Text style={styles.text}>{TESTS_LIMIT - allowedTestsCount}/{TESTS_LIMIT}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Unlearned words:</Text>
                        <Text style={styles.text}>{unlearnedWordsCount}</Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        text="Start Test"
                        backgroundColor={COLORS.lightRed}
                        onPress={handlerStartTest}
                        disabled={allowedTestsCount === 0}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.wrap}>
            {
                hasMore ? (
                    <PracticeStep
                        words={words}
                        onStep={handlerStep}
                        onFinish={handlerLastStep}
                    />
                ) : (
                    <PracticeResults
                        answersCount={words.length}
                        correctAnswersCount={correctAnswersCount}
                        learnedWordsCount={learnedWordsCount}
                        onReset={handlerResetTest}
                        onFinish={handlerFinishTest}
                    />
                )
            }
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
    buttonsContainer: {
        width: 220
    },
    textBlock: {
        marginBottom: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    text: {
        fontSize: 19
    },
    description: {
        fontSize: 19,
        marginBottom: 15
    },
});

const defaultProps = {
    data: [],
    allowedTestsCount: 0,
    onReset: () => {},
    onStart: () => {},
    onFinish: () => {}
};

PracticeContainer.propTypes = {
    data: PropTypes.array,
    allowedTestsCount: PropTypes.number,
    onReset: PropTypes.func,
    onStart: PropTypes.func,
    onFinish: PropTypes.func
};

export default PracticeContainer;
