import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import { COLORS } from '../../constants/theme';
import WordList from '../../components/word-list';
import { DictionaryScreenProps } from '../../types';

const DictionaryScreen = (props: DictionaryScreenProps) => {
    const { navigation } = props;
    const { store: { filterMask, dictionary } } = useAppContext();
    const words = Object.values(dictionary);

    const filteredWords = words.filter(el => {
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
        flex: 1,
        backgroundColor: COLORS.lighterGray,
    }
});

export default DictionaryScreen;
