import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import { SetError } from '../../store/actions';
import { COLORS } from '../../constants/theme';
import Button from '../button';

const AlertModal = () => {
    const { store: { alertMessage }, dispatch } = useAppContext();
    const closeModal = () => {
        dispatch(SetError(null));
    };

    if (!alertMessage) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={!!alertMessage}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{alertMessage}</Text>
                    <Button text="Cancel" onPress={closeModal} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        width: 320,
        backgroundColor: COLORS.lightRed,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.white
    }
});

export default AlertModal;
