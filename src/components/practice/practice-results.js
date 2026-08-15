import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import IconButton from '../button/icon-button';

const PracticeResults = props => {
    const {
        answersCount,
        correctAnswersCount,
        learnedWordsCount,
        onReset,
        onFinish
    } = { ...defaultProps, ...props };

    const isPassed = (correctAnswersCount / answersCount) > .7;

    const handlerFinish = () => {
        onFinish(isPassed);
    }

    return (
        <View>
            <View style={styles.title}>
                <View style={styles.totalScore}>
                    <Icon
                        name={ isPassed ? 'happy-outline': 'sad-outline'}
                        size={50}
                    />
                    <Text style={styles.totalScoreText}>
                        {correctAnswersCount}/{answersCount}
                    </Text>
                </View>
                <Text style={styles.titleText}>{isPassed ? 'Good Work' : 'Try again'}</Text>
            </View>

            <View style={styles.results}>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Words count:</Text>
                    <Text style={styles.resultsRowCount}>{answersCount}</Text>
                </View>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Correct answers:</Text>
                    <Text style={styles.resultsRowCount}>{correctAnswersCount}</Text>
                </View>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Learned words:</Text>
                    <Text style={styles.resultsRowCount}>{learnedWordsCount}</Text>
                </View>
            </View>
            <View style={styles.buttonWrap}>
                <IconButton
                    text="Finish"
                    underlayColor={COLORS.lightGray}
                    backgroundColor={COLORS.lighterGray}
                    borderColor={COLORS.darkerGray}
                    icon="checkmark-circle-outline"
                    color={COLORS.darkerGray}
                    onPress={handlerFinish}
                />
                <IconButton
                    text="Reset"
                    underlayColor={COLORS.lightGray}
                    backgroundColor={COLORS.lighterGray}
                    borderColor={COLORS.darkerGray}
                    icon="refresh"
                    color={COLORS.darkerGray}
                    onPress={onReset}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    totalScore: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalScoreText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    results: {
        marginBottom: 15
    },
    resultsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    resultsRowText: {
        fontSize: 18
    },
    resultsRowCount: {
        fontSize: 18,
        marginLeft: 10
    },
    buttonWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

const defaultProps = {
    onReset: () => {},
    onFinish: () => {}
}

PracticeResults.propTypes = {
    answersCount: PropTypes.number.isRequired,
    correctAnswersCount: PropTypes.number.isRequired,
    learnedWordsCount: PropTypes.number.isRequired,
    onReset: PropTypes.func,
    onFinish: PropTypes.func
};

export default PracticeResults;
