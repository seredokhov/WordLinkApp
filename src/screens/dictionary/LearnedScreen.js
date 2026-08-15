import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ContextApp } from '../../store/context';
import WordList from '../../components/word-list';

const LearnedScreen = props => {
    const { navigation } = props;
    const { store: { filterMask, dictionary } } = useContext(ContextApp);
    const words = Object.values(dictionary);

    const filteredWords = words.filter(el => {
        if (!el.isLearned) {
            return false;
        }

        const upper = el.word.toUpperCase();
        return upper.startsWith(filterMask);
    });

    useEffect(() => {
        navigation.setParams({ count: filteredWords.length });
    }, [filteredWords.length]);

    return (
        <View style={styles.screen}>
            <WordList data={filteredWords} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default LearnedScreen;
