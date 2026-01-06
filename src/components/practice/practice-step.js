import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const PracticeStep = props => {
    const {
        words,
        onStep,
        onFinish
    } = { ...defaultProps, ...props };

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentEntity = words[currentIndex];
    const { entity, translation, suggestions } = currentEntity;

    const handleChangeAnswer = suggestion => {
        onStep({
            isCorrect: suggestion === translation,
            entity
        });

        if (currentIndex < words.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            onFinish();
        }
    };

    const renderTranslations = () => (
        suggestions.map((suggestion, index) => (
            <TouchableHighlight
                key={index}
                style={styles.suggestionButton}
                underlayColor={COLORS.darkGray}
                onPress={() => handleChangeAnswer(suggestion)}
            >
                <Text style={styles.suggestion}>{suggestion}</Text>
            </TouchableHighlight>
        ))
    );

    return (
        <View style={styles.wrap}>
            <View style={styles.title}>
                <Text style={styles.word}>{entity.word}</Text>
                <View style={styles.progress}>
                    <Text style={styles.counter}>{`${currentIndex + 1}/${words.length}`}</Text>
                    <Icon name={'newspaper'} size={25} />
                </View>
            </View>
            <View style={styles.suggestionsBlock}>
                {renderTranslations()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
        marginBottom: 20
    },
    suggestion: {
        fontSize: 24,
        textAlign: 'center',
    },
    suggestionButton: {
        width: 350,
        paddingVertical:5,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        marginBottom: 10
    },
    suggestionsBlock: {
        marginBottom: 10
    },
    word: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    counter: {
        textAlign: 'center',
        fontSize: 25,
        marginRight: 5
    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const defaultProps = {
    onFinish: () => {},
    onStep: () => {}
};

PracticeStep.propTypes = {
    words: PropTypes.array.isRequired,
    onStep: PropTypes.func,
    onFinish: PropTypes.func
};

export default PracticeStep;
