import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Switch, TouchableHighlight } from 'react-native';
import { ContextApp } from '../../store/context';
import { COLORS } from '../../constants/theme';
import CloudButtons from '../cloud/cloud-buttons';
import UserService from '../../services/user-service';
import AsyncStorageService from '../../services/async-storage-service';
import { UpdateUser, SetError } from '../../store/actions';
import { errorHandler } from '../../utils';
import ConfirmDeletionModal from '../modal/confirm-deletion-modal';
import CheckConnection from '../check-connection';

const CONFIRMATION_STRING = 'Delete';

const DatabaseContainer = props => {
    const { onDeleteUser } = { ...defaultProps, ...props };

    const { store: { user, isOnline }, dispatch } = useContext(ContextApp);
    const { isDataSynchronized } = user || {};

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const openConformModal = () => setConfirmModalOpen(true);

    const closeConformModal = () => setConfirmModalOpen(false);

    const handleToggleSwitch = () => {
        if (isOnline && user.token) {
            const newUser = {
                ...user,
                isDataSynchronized: !isDataSynchronized
            };

            UserService.updateUser(newUser, user.token)
                .then(() => AsyncStorageService.setUser(newUser))
                .then(() => {
                    dispatch(UpdateUser(newUser));
                })
                .catch(err => dispatch(SetError(errorHandler(err))));
        }
    };

    const deleteUser = () => {
        UserService.deleteUser(user.token)
            .then(() => onDeleteUser())
            .catch(err => dispatch(SetError(errorHandler(err))));
    };

    if (!isOnline) {
        return (
            <CheckConnection text="Check your internet connection to access database settings" />
        );
    }

    return (
        <View>
            <Text style={styles.sectionHeader}>Database section</Text>
            <View style={styles.row}>
                <View>
                    <Text style={styles.text}>Connect to database:</Text>
                </View>
                <Switch
                    trackColor={{false: '#767577', true: '#d34b49'}}
                    thumbColor={isDataSynchronized ? '#572020' : '#f4f3f4'}
                    onValueChange={handleToggleSwitch}
                    value={isDataSynchronized}
                />
            </View>
            <View style={styles.cloudButtonsBlock}>
                {
                    isDataSynchronized && (
                        <Fragment>
                            <CloudButtons />
                            <TouchableHighlight
                                style={styles.removeButton}
                                underlayColor={COLORS.gray}
                                onPress={openConformModal}
                            >
                                <Text style={styles.removeButtonText}>Delete User</Text>
                            </TouchableHighlight>
                        </Fragment>
                    )
                }
            </View>
            {
                isConfirmModalOpen && (
                    <ConfirmDeletionModal
                        animationType="slide"
                        text={`If you want to delete your account enter string "${CONFIRMATION_STRING}" to the input field and confirm`}
                        confirmationText={CONFIRMATION_STRING}
                        isOpen={isConfirmModalOpen}
                        onConfirm={deleteUser}
                        onClose={closeConformModal}
                    />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    text: {
        fontSize: 17
    },
    sectionHeader: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 10
    },
    cloudButtonsBlock: {
        height: 130
    },
    removeButton: {
        display: 'flex',
        backgroundColor: COLORS.lightGray,
        padding: 5,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        color: COLORS.white
    },
    removeButtonText: {
        fontSize: 16,
        color: COLORS.darkerGray
    }
});

const defaultProps = {
    onDeleteUser: () => {}
};

DatabaseContainer.propTypes = {
    onDeleteUser: PropTypes.func
};

export default DatabaseContainer;
