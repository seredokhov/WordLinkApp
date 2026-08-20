import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import Button from '../button';
import Title from '../title';

export type PracticeIntroStat = {
    label: string;
    value: string | number;
};

type PracticeIntroProps = {
    description: string;
    stats: PracticeIntroStat[];
    startDisabled?: boolean;
    onStart: () => void;
};

const defaultProps = {
    startDisabled: false
};

const PracticeIntro = (props: PracticeIntroProps) => {
    const {
        description,
        stats,
        startDisabled,
        onStart
    } = { ...defaultProps, ...props };

    return (
        <View style={styles.wrap}>
            <Title title="Practice" iconName="school" />
            <View style={styles.textBlock}>
                <Text style={styles.description}>{description}</Text>
                {stats.map((stat) => (
                    <View key={stat.label} style={styles.row}>
                        <Text style={styles.text}>{stat.label}</Text>
                        <Text style={styles.text}>{stat.value}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    text="Start Test"
                    backgroundColor={COLORS.lightRed}
                    onPress={onStart}
                    disabled={startDisabled}
                />
            </View>
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

export default PracticeIntro;
