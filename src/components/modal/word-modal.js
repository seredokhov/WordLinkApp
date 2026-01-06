import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import VoiceService from '../../services/voice-service';
import { COLORS, SIZES } from '../../constants/theme';
import Input from '../input';
import IconButton from '../button/icon-button';

const WordModal = props => {
    const {
        wordData,
        isOpen,
        onClose,
        onSave,
        isEditMode
    } = { ...defaultProps, ...props };

    const [word, setWord] = useState(wordData.word);
    const [translate, setTranslate] = useState(wordData.translate);
    const [isLearned, setLearned] = useState(wordData.isLearned);

    const saveWord = () => {
        const newWordData = {
            ...wordData,
            word,
            translate,
            isLearned,
            progress: (isLearned !== wordData.isLearned) ? (isLearned ? 3 : 0) : wordData.progress,
            lastUpdate: new Date().toISOString()
        };

        onSave(newWordData);
    };

    const handleToggleLearn = () => {
        setLearned(prevValue => !prevValue);
    };

    const listen = useCallback(() => {
        VoiceService.play(word);
    }, [word]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Save Word</Text>
                    <View style={styles.inputBlock}>
                        <Input
                            value={word}
                            iconText="EN"
                            maxLength={13}
                            onChangeText={setWord}
                        />
                    </View>
                    <View>
                        <Input
                            value={translate}
                            iconText="RU"
                            maxLength={20}
                            onChangeText={setTranslate}
                        />
                    </View>
                    <View style={styles.buttonBlockWrapper}>
                        <View style={styles.buttonBlock}>
                            <View style={styles.buttonWrap}>
                                <IconButton
                                    text="Save"
                                    icon="checkmark"
                                    style={styles.button}
                                    disabled={!word || !translate}
                                    onPress={saveWord}
                                />
                            </View>
                            <View style={styles.buttonWrap}>
                                <IconButton
                                    text="Listen"
                                    icon="volume-high"
                                    style={styles.button}
                                    disabled={!word}
                                    onPress={listen}
                                />
                            </View>
                            {
                                isEditMode && (
                                    <View style={styles.buttonWrap}>
                                        <IconButton
                                            text="Learned"
                                            icon={isLearned ? 'flag' : 'flag-outline'}
                                            style={styles.button}
                                            active={isLearned}
                                            onPress={handleToggleLearn}
                                        />
                                    </View>
                                )
                            }
                            <View style={styles.buttonWrap}>
                                <IconButton
                                    text="Close"
                                    icon="close-sharp"
                                    style={styles.button}
                                    onPress={onClose}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const defaultProps = {
    isEditMode: false,
    onClose: () => {},
    onSave: () => {}
};

WordModal.propTypes = {
    wordData: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightRed,
    },
    modalView: {
        width: 350,
        margin: SIZES.baseMargin,
    },
    title: {
        marginBottom: 5,
        fontSize: SIZES.h1,
        color: COLORS.white,
        textAlign: 'center'
    },
    inputBlock: {
        marginBottom: 10
    },
    buttonBlock: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonBlockWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonWrap: {
        marginHorizontal: 3
    },
});

export default WordModal;
