import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import WordContainer from './word-container';
import SearchContainer from './search-container';
import { COLORS, SIZES } from '../../constants/theme';

const HomeTopContainer = (props) => {
    const { isRemoteDictionary, selectedWord } = props;

    if (isRemoteDictionary) {
        return (
            <View style={styles.remoteTitleWrap}>
                <Text style={styles.remoteTitle}>WordLink</Text>
            </View>
        );
    }

    return selectedWord.word ? <WordContainer /> : <SearchContainer />;
};

HomeTopContainer.propTypes = {
    isRemoteDictionary: PropTypes.bool.isRequired,
    selectedWord: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    remoteTitle: {
        fontSize: SIZES.h1,
        color: COLORS.white,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    remoteTitleWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10
    },
});

export default HomeTopContainer;
