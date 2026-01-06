import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import IconButton from '../button/icon-button';
import Input from '../input';

const ConfirmDeletion = props => {
    const {
        text,
        confirmationText,
        isOpen,
        animationType,
        onClose,
        onConfirm,
    } = { ...defaultProps, ...props };

    const [value, setValue] = useState('');

    const confirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{text}</Text>
                    <View style={styles.inputWrapper}>
                        <Input
                            value={value}
                            maxLength={13}
                            onChangeText={setValue}
                        />
                    </View>
                    <View style={styles.buttonBlockWrapper}>
                        <View style={styles.buttonBlock}>
                            <IconButton
                                text="Confirm"
                                icon="checkmark"
                                disabled={value !== confirmationText}
                                onPress={confirm}
                            />
                            <IconButton
                                text="Cancel"
                                icon="close-sharp"
                                onPress={onClose}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const defaultProps = {
    text: 'Are you sure?',
    animationType: 'slide'
};

ConfirmDeletion.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    animationType: PropTypes.string,
    text: PropTypes.string
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightRed,
    },
    modalView: {
        width: 300,
        alignItems: 'center'
    },
    modalText: {
        marginBottom: SIZES.baseMargin * 2,
        fontSize: 23,
        color: COLORS.white,
        textAlign: 'center'
    },
    buttonBlock: {
        marginTop: 10,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonBlockWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        width: '45%',
        height: 50,
        padding: SIZES.padding / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius
    },
    inputWrapper: {
        width: 250
    }
});

export default ConfirmDeletion;
