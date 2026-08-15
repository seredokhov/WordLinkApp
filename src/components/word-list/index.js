import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import { SelectWord } from '../../store/actions';
import Word from '../word';

const WordList = props => {
    const { data } = props;
    const { store: { selectedWord }, dispatch } = useAppContext();
    const sortedData = data.sort((a, b) => a.word.localeCompare(b.word));

    const selectWord = wordData => {
        return () => {
            if (selectedWord.word === wordData.word) {
                dispatch(SelectWord({}));
                return;
            }

            dispatch(SelectWord(wordData));
        }
    };

    const renderItem = data => {
        const { item: wordData } = data;

        const {
            word,
            translate,
            isFavorite,
            isLearned
        } = wordData;

        return (
            <Word
                name={word}
                translate={translate}
                isFavorite={isFavorite}
                isLearned={isLearned}
                isSelected={selectedWord.word === word}
                onPress={selectWord(wordData)}
            />
        );
    };

    return (
        <View style={styles.wrap}>
            <FlatList
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={item => item.word}
            />
        </View>
    );
};

WordList.propTypes = {
    data: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        backgroundColor: COLORS.white,
    },
});

export default WordList;
