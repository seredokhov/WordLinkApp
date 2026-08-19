import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import BorderedHeader from '../../components/header/bordered-header';
import Content from '../../components/content';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import ConfirmModal from '../../components/modal/confirm-modal';
import DatabaseContainer from '../../components/container/database-container';
import Button from '../../components/button';
import Title from '../../components/title';
import { ProfileScreenProps } from '../../types';
import { HeaderIconAction } from '../../components/header/actions';

const ProfileScreen = (props: ProfileScreenProps) => {
    const { navigation } = props;
    const { store: { user, dictionary } } = useAppContext();
    const { name, login, token } = user || {};
    const wordsCount = Object.keys(dictionary).length;
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const openConformModal = () => setConfirmModalOpen(true);

    const closeConformModal = () => setConfirmModalOpen(false);

    const back = (): void => {
        navigation.navigate('Home');
    };

    const logout = () => {
        closeConformModal();
        navigation.getParent()?.reset({
            index: 0,
            routes: [
                {
                    name: 'Auth',
                    state: {
                        index: 0,
                        routes: [{ name: 'GetStarted' }],
                    },
                },
            ],
        });
    };

    const createUser = () => {
        console.log('createUser')
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Registration'
            })
        );
    };

    return (
        <View style={styles.page}>
            <BorderedHeader
                leftContent={<HeaderIconAction icon="arrow-back-outline" onPress={back} />}
                rightContent={<HeaderIconAction icon="log-out-outline" onPress={openConformModal} bordered />}
            >
                <Text style={styles.title}>Profile</Text>
            </BorderedHeader>
            <Content>
                <View style={styles.content}>
                    <Title title="Profile" iconName="person-circle" />
                    <View style={styles.rowsBlock}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.text}>{name}</Text>
                        </View>
                        {
                            login && (
                                <View style={styles.row}>
                                    <Text style={styles.label}>Login:</Text>
                                    <Text style={styles.text}>{login}</Text>
                                </View>
                            )
                        }
                        <View style={styles.row}>
                            <Text style={styles.label}>Words:</Text>
                            <Text style={styles.text}>{wordsCount}</Text>
                        </View>
                    </View>
                    {
                        token ? (
                            <DatabaseContainer onDeleteUser={logout} />
                        ) : (
                            <View style={styles.buttonContainer}>
                                <View style={styles.buttonWrap}>
                                    <Button
                                        text="Create Account"
                                        backgroundColor={COLORS.lightRed}
                                        onPress={createUser}
                                    />
                                </View>
                            </View>
                        )
                    }
                    {
                        isConfirmModalOpen && (
                            <ConfirmModal
                                animationType="slide"
                                text={'Are you sure you want to logout?'}
                                isOpen={isConfirmModalOpen}
                                onConfirm={logout}
                                onClose={closeConformModal}
                            />
                        )
                    }
                </View>
            </Content>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.lighterGray,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 300
    },
    rowsBlock: {
        marginBottom: 30
    },
    title: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    label: {
        fontSize: 19
    },
    text: {
        fontSize: 17
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonWrap: {
        width: 220
    }
});

export default ProfileScreen;
