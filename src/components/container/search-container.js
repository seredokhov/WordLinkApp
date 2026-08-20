import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import { AddWord, Filter, SetError } from '../../store/actions';
import AsyncStorageService from '../../services/async-storage-service';
import WordService from '../../services/word-service';
import WordModal from '../modal/word-modal';
import Input from '../input';
import { errorHandler } from '../../utils';
import Title from '../title';

const SearchContainer = () => {
    const [isWordModalOpen, setWordModalOpen] = useState(false);
    const [wordName, setWordName] = useState('');
    const { store: { user, isOnline }, dispatch } = useAppContext();

    const wordDraft = {
        word: wordName,
        translate: '',
        isFavorite: false,
        isLearned: false,
        progress: 0,
    };

    const openWordModal = () => {
        setWordModalOpen(true);
    };

    const closeWordModal = () => {
        setWordModalOpen(false);
    };

    const localSaveWord = wordData => {
        AsyncStorageService.saveWord(wordData)
            .then(() => {
                dispatch(AddWord(wordData));
                setWordName('');
                setWordModalOpen(false);
            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const saveWord = newWordData => {
        if (isOnline && user.isDataSynchronized && user.token) {
            WordService.createWord(newWordData, user.token)
                .then(localSaveWord)
                .catch(err => dispatch(SetError(errorHandler(err))));
        } else {
            localSaveWord(newWordData);
        }
    };

    const changeWordName = text => {
        setWordName(text);
        dispatch(Filter(text.toUpperCase()));
    };

    return (
        <View style={styles.wrap}>
            <Title title="WordLink" iconName="book" />
            <Input
                value={wordName}
                icon="search"
                buttonIcon="add"
                maxLength={13}
                onChangeText={changeWordName}
                onButtonPress={openWordModal}
            />
            {
                isWordModalOpen && (
                    <WordModal
                        wordData={wordDraft}
                        isOpen={isWordModalOpen}
                        onClose={closeWordModal}
                        onSave={saveWord}
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        right: 5
    }
});

export default SearchContainer;
