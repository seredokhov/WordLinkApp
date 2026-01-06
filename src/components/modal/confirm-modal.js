import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import IconButton from '../button/icon-button';

const ConfirmModal = props => {
    const {
        text,
        isOpen,
        animationType,
        onClose,
        onConfirm,
    } = { ...defaultProps, ...props };

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
                    <View style={styles.buttonBlockWrapper}>
                        <View style={styles.buttonBlock}>
                            <IconButton
                                text="Confirm"
                                icon="checkmark"
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

ConfirmModal.propTypes = {
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
        width: 350,
        margin: SIZES.baseMargin,
    },
    modalText: {
        marginBottom: SIZES.baseMargin * 2,
        fontSize: SIZES.h2,
        color: COLORS.white,
        textAlign: 'center'
    },
    buttonBlock: {
        marginTop: 20,
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
});

export default ConfirmModal;
