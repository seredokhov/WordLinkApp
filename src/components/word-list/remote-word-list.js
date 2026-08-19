import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import { AddWord, DeleteWord, SetError } from '../../store/actions';
import RemoteWord from '../word/remote-word';
import ConfirmModal from '../modal/confirm-modal';
import AsyncStorageService from '../../services/async-storage-service';
import WordService from '../../services/word-service';
import { errorHandler } from '../../utils';

const RemoteWordList = (props) => {
    const { data } = props;
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [actionWord, setActionWord] = useState(null);
    const { store: { dictionary, user, isOnline }, dispatch } = useAppContext();
    const sortedData = [...data].sort((a, b) => a.word.localeCompare(b.word));
    const normalizeWord = (value) => (value || '').trim().toUpperCase();

    const getLocalWordEntry = (wordValue) => {
        const normalizedTarget = normalizeWord(wordValue);
        return Object.entries(dictionary).find(([wordName]) => normalizeWord(wordName) === normalizedTarget) || null;
    };

    const openConfirmModal = (wordData) => {
        setActionWord(wordData);
        setConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
        setActionWord(null);
    };

    const localAddWord = (wordData) => {
        AsyncStorageService.saveWord(wordData)
            .then(() => dispatch(AddWord(wordData)))
            .catch((err) => dispatch(SetError(errorHandler(err))));
    };

    const addWord = (remoteWord) => {
        const wordData = {
            ...remoteWord,
            word: remoteWord.word.trim(),
            translate: remoteWord.translate.trim(),
            isFavorite: false,
            isLearned: false,
            progress: 0,
            lastUpdate: new Date().toISOString(),
        };

        if (isOnline && user?.isDataSynchronized && user?.token) {
            WordService.createWord(wordData, user.token)
                .then(localAddWord)
                .catch((err) => dispatch(SetError(errorHandler(err))));
            return;
        }

        localAddWord(wordData);
    };

    const localDeleteWord = (wordName) => {
        AsyncStorageService.deleteWord(wordName)
            .then(() => dispatch(DeleteWord(wordName)))
            .catch((err) => dispatch(SetError(errorHandler(err))));
    };

    const deleteWord = (remoteWord) => {
        const entry = getLocalWordEntry(remoteWord.word);
        if (!entry) {
            return;
        }

        const [wordName, localWordData] = entry;
        if (isOnline && user?.isDataSynchronized && user?.token && localWordData.id) {
            WordService.deleteWord(localWordData.id, user.token)
                .then(() => localDeleteWord(wordName))
                .catch((err) => dispatch(SetError(errorHandler(err))));
            return;
        }

        localDeleteWord(wordName);
    };

    const confirmAction = () => {
        if (!actionWord) {
            return;
        }

        if (getLocalWordEntry(actionWord.word)) {
            deleteWord(actionWord);
            return;
        }

        addWord(actionWord);
    };

    const isActionWordAdded = actionWord && !!getLocalWordEntry(actionWord.word);
    const confirmationText = isActionWordAdded
        ? 'Do you want to remove this word from your dictionary?'
        : 'Do you want to add this word to your dictionary?';

    const renderItem = ({ item: wordData }) => {
        const { word, translate } = wordData;
        const isAdded = !!getLocalWordEntry(word);

        return (
            <RemoteWord
                name={word}
                translate={translate}
                isAdded={isAdded}
                onActionPress={() => openConfirmModal(wordData)}
            />
        );
    };

    return (
        <View style={styles.wrap}>
            <FlatList
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.word}
            />
            {
                isConfirmModalOpen && (
                    <ConfirmModal
                        isOpen={isConfirmModalOpen}
                        text={confirmationText}
                        onClose={closeConfirmModal}
                        onConfirm={confirmAction}
                    />
                )
            }
        </View>
    );
};

RemoteWordList.propTypes = {
    data: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        backgroundColor: COLORS.white,
    },
});

export default RemoteWordList;
