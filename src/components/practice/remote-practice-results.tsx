import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import IconButton from '../button/icon-button';
import { noop } from '../../utils';

type RemotePracticeResultsProps = {
    answersCount: number;
    correctAnswersCount: number;
    onReset: () => void;
    onFinish: () => void;
};

const defaultProps = {
    onReset: noop,
    onFinish: noop
};

const RemotePracticeResults = (props: RemotePracticeResultsProps) => {
    const {
        answersCount,
        correctAnswersCount,
        onReset,
        onFinish
    } = { ...defaultProps, ...props };

    const accuracy = answersCount > 0
        ? Math.round((correctAnswersCount / answersCount) * 100)
        : 0;

    return (
        <View>
            <View style={styles.title}>
                <View style={styles.totalScore}>
                    <Icon name="stats-chart-outline" size={50} />
                    <Text style={styles.totalScoreText}>{accuracy}%</Text>
                </View>
                <Text style={styles.titleText}>Results</Text>
            </View>

            <View style={styles.results}>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Correct answers:</Text>
                    <Text style={styles.resultsRowCount}>{correctAnswersCount}</Text>
                </View>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Words count:</Text>
                    <Text style={styles.resultsRowCount}>{answersCount}</Text>
                </View>
                <View style={styles.resultsRow}>
                    <Text style={styles.resultsRowText}>Accuracy:</Text>
                    <Text style={styles.resultsRowCount}>{accuracy}%</Text>
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
                    onPress={onFinish}
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
    title: {
        marginBottom: 0
    },
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

export default RemotePracticeResults;
