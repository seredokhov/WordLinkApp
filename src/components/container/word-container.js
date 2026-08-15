import React, { useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import { DeleteWord, SelectWord, UpdateWord, SetError } from '../../store/actions';
import AsyncStorageService from '../../services/async-storage-service';
import WordService from '../../services/word-service';
import VoiceService from '../../services/voice-service';
import WordModal from '../modal/word-modal';
import ConfirmModal from '../modal/confirm-modal';
import IconButton from '../button/icon-button';
import { errorHandler } from '../../utils';

const WordContainer = () => {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const { store: { user, selectedWord, isOnline }, dispatch } = useAppContext();

    const {
        id,
        word,
        translate,
        isFavorite,
    } = selectedWord;

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const openConfirmModal = () => {
        setConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const listen = () => {
        VoiceService.play(word);
    };

    const localDeleteWord = wordName => {
        AsyncStorageService.deleteWord(wordName)
            .then(() => dispatch(DeleteWord(wordName)))
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const deleteWord = () => {
        if (isOnline && user.isDataSynchronized && user.token && id) {
            WordService.deleteWord(id, user.token)
                .then(() => localDeleteWord(word))
                .catch(err => dispatch(SetError(errorHandler(err))));

            return;
        }

        localDeleteWord(word);
    };

    const localUpdateWord = updatedWordData => {
        const wordDataToUpdate = {
            oldWordName: word,
            newWordData: updatedWordData
        };

        AsyncStorageService.updateWord(wordDataToUpdate)
            .then(() => {
                dispatch(UpdateWord(wordDataToUpdate));
                setEditModalOpen(false);
            })
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    const updateWord = newWordData => {
        if (isOnline && user.isDataSynchronized && user.token) {
            const mergeNewWordData = newWordData.id ? WordService.updateWord : WordService.createWord;

            mergeNewWordData(newWordData, user.token)
                .then(updatedWordData => localUpdateWord(updatedWordData))
                .catch(err => dispatch(SetError(errorHandler(err))));
        } else {
            localUpdateWord(newWordData);
        }
    };

    const toggleFavorite = () => {
        const newWordData = {
            ...selectedWord,
            isFavorite: !isFavorite,
            lastUpdate: new Date()
        };

        updateWord(newWordData);
    };

    const unselectWord = () => {
        dispatch(SelectWord({}));
    };

    const buttons = [
        {
            text: 'Listen',
            icon: 'volume-high-outline',
            onPress: listen
        },
        {
            text: 'Favorite',
            icon: isFavorite ? 'star' : 'star-outline',
            active: isFavorite,
            onPress: toggleFavorite
        },
        {
            text: 'Edit',
            icon: 'brush-outline',
            onPress: openEditModal
        },
        {
            text: 'Delete',
            icon: 'trash-outline',
            onPress: openConfirmModal
        },
        {
            text: 'Back',
            icon: 'arrow-undo-outline',
            onPress: unselectWord
        }
    ];

    const renderButtons = buttons.map(({ text, icon, active, onPress }, index) => (
        <IconButton
            key={index}
            text={text}
            icon={icon}
            active={active}
            onPress={onPress}
        />
    ));

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textWord}>{word}</Text>
                <Text style={styles.textTranslate}>{translate}</Text>
            </View>
            <View style={styles.buttonBlock}>
                {renderButtons}
            </View>
            {
                isConfirmModalOpen && (
                    <ConfirmModal
                        isOpen={isConfirmModalOpen}
                        onConfirm={deleteWord}
                        onClose={closeConfirmModal}
                    />
                )
            }
            {
                isEditModalOpen && selectedWord.word && (
                    <WordModal
                        wordData={selectedWord}
                        isOpen={isEditModalOpen}
                        onSave={updateWord}
                        onClose={closeEditModal}
                        isEditMode
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textContainer: {
        marginBottom: 10
    },
    textWord: {
        fontSize: SIZES.h1,
        lineHeight: 45,
        color: COLORS.white,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    textTranslate: {
        fontSize: SIZES.h2,
        lineHeight: 30,
        color: COLORS.gray,
        fontWeight: 'thin',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    buttonBlock: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default WordContainer;
