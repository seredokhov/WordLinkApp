import React from 'react';
import PropTypes from 'prop-types';
import WordContainer from './word-container';
import SearchContainer from './search-container';
import Title from '../title';

const HomeTopContainer = (props) => {
    const { isRemoteDictionary, selectedWord } = props;

    if (isRemoteDictionary) {
        return (
            <Title title="WordLink" iconName="book" />
        );
    }

    return selectedWord.word ? <WordContainer /> : <SearchContainer />;
};

HomeTopContainer.propTypes = {
    isRemoteDictionary: PropTypes.bool.isRequired,
    selectedWord: PropTypes.object.isRequired,
};

export default HomeTopContainer;
