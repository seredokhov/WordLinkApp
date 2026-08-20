import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import PracticeStep from './practice-step';
import PracticeResults from './practice-results';
import PracticeIntro from './practice-intro';
import { useIsFocused } from '@react-navigation/native';
import { TESTS_LIMIT } from '../../constants/practice';

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
            <PracticeIntro
                description="You can pass 3 tests per day to mark your words as learned."
                stats={[
                    { label: 'Passed tests:', value: `${TESTS_LIMIT - allowedTestsCount}/${TESTS_LIMIT}` },
                    { label: 'Unlearned words:', value: unlearnedWordsCount },
                ]}
                startDisabled={allowedTestsCount === 0}
                onStart={handlerStartTest}
            />
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
});

const defaultProps = {
    words: [],
    unlearnedWordsCount: 0,
    allowedTestsCount: 0,
    onReset: () => {},
    onStart: () => {},
    onFinish: () => {}
};

PracticeContainer.propTypes = {
    words: PropTypes.arrayOf(
        PropTypes.shape({
            entity: PropTypes.object.isRequired,
            suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
            translation: PropTypes.string.isRequired,
        })
    ),
    unlearnedWordsCount: PropTypes.number,
    allowedTestsCount: PropTypes.number,
    onReset: PropTypes.func,
    onStart: PropTypes.func,
    onFinish: PropTypes.func
};

export default PracticeContainer;
