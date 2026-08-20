import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Content from '../../components/content';
import BorderedHeader from '../../components/header/bordered-header';
import { HeaderIconAction } from '../../components/header/actions';
import { COLORS } from '../../constants/theme';
import { ACTIVE_DICTIONARY_TYPE, MY_DICTIONARY_ID } from '../../constants/dictionary';
import { DictionariesScreenProps, PublicDictionary } from '../../types';
import { useAppContext } from '../../store/context';
import { SetActiveDictionary, SetError } from '../../store/actions';
import { errorHandler } from '../../utils';
import Loader from '../../components/loader';
import DictionaryService from '../../services/dictionary-service';
import DictionaryList from '../../components/dictionary-list';
import DictionaryListItem from '../../components/dictionary-list/dictionary-list-item';
import Button from '../../components/button';
import { useIsFocused } from '@react-navigation/native';
import AuthRequired from '../../components/auth-required';

const DictionariesScreen = (props: DictionariesScreenProps) => {
    const { navigation } = props;
    const { store: { user, dictionary, activeDictionary }, dispatch } = useAppContext();
    const [dictionaries, setDictionaries] = useState<PublicDictionary[]>([]);
    const [selectedDictionaryId, setSelectedDictionaryId] = useState<string>(activeDictionary.id);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const isFocused = useIsFocused();

    const goHome = () => {
        navigation.navigate('Home');
    };

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    useEffect(() => {
        if (!isFocused || !user?.token) {
            if (!user?.token) {
                setIsLoading(false);
            }
            return;
        }

        DictionaryService.getDictionaries(user.token)
            .then((responseDictionaries) => {
                setDictionaries(responseDictionaries);
            })
            .catch((err) => dispatch(SetError(errorHandler(err))))
            .finally(() => setIsLoading(false));
    }, [dispatch, user?.token, isFocused]);

    useEffect(() => {
        setSelectedDictionaryId(activeDictionary.id);
    }, [activeDictionary.id]);

    const myDictionaryItem: PublicDictionary = {
        id: MY_DICTIONARY_ID,
        title: 'My Dictionary',
        wordsCount: Object.keys(dictionary).length,
    };

    const dictionariesWithProgress = dictionaries.map((item) => {
        if (
            activeDictionary.type !== ACTIVE_DICTIONARY_TYPE.REMOTE ||
            item.id !== activeDictionary.id ||
            !activeDictionary.progress
        ) {
            return item;
        }

        return {
            ...item,
            progress: activeDictionary.progress,
        };
    });

    const isSaveDisabled = selectedDictionaryId === activeDictionary.id;

    const saveSelectedDictionary = () => {
        if (selectedDictionaryId === myDictionaryItem.id) {
            dispatch(SetActiveDictionary({
                id: MY_DICTIONARY_ID,
                type: ACTIVE_DICTIONARY_TYPE.LOCAL,
                title: myDictionaryItem.title,
                dictionary,
            }));
            navigation.navigate('Home');
            return;
        }

        if (!user?.token) {
            return;
        }

        const selectedDictionary = dictionaries.find((item) => item.id === selectedDictionaryId);
        if (!selectedDictionary) {
            return;
        }

        setIsSaving(true);
        DictionaryService.getDictionaryWords(selectedDictionaryId, user.token)
            .then((remoteDictionary) => {
                dispatch(SetActiveDictionary({
                    id: selectedDictionaryId,
                    type: ACTIVE_DICTIONARY_TYPE.REMOTE,
                    title: selectedDictionary.title,
                    theme: selectedDictionary.theme || selectedDictionary.title,
                    dictionary: remoteDictionary,
                    progress: selectedDictionary.progress,
                }));
                navigation.navigate('Home');
            })
            .catch((err) => dispatch(SetError(errorHandler(err))))
            .finally(() => setIsSaving(false));
    };

    const renderContent = () => {
        if (!user?.token) {
            return <AuthRequired />;
        }

        if (isLoading || isSaving) {
            return <Loader iconSize={50} />;
        }

        return (
            <View style={styles.listWrap}>
                <DictionaryListItem
                    item={myDictionaryItem}
                    isSelected={selectedDictionaryId === myDictionaryItem.id}
                    onPress={() => setSelectedDictionaryId(myDictionaryItem.id)}
                />
                <DictionaryList
                    data={dictionariesWithProgress}
                    selectedId={selectedDictionaryId}
                    onSelect={setSelectedDictionaryId}
                />
                <View style={styles.buttonWrap}>
                    <Button
                        text="Save"
                        backgroundColor={COLORS.lightRed}
                        onPress={saveSelectedDictionary}
                        disabled={isSaveDisabled}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.page}>
            <BorderedHeader
                leftContent={<HeaderIconAction icon="arrow-back-outline" onPress={goHome} />}
                rightContent={<HeaderIconAction icon="person-circle" onPress={navigateToProfile} bordered />}
            >
                <Text style={styles.title}>Dictionaries</Text>
            </BorderedHeader>
            <Content>
                <View style={styles.content}>
                    {renderContent()}
                </View>
            </Content>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.red,
    },
    title: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    listWrap: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    buttonWrap: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }
});

export default DictionariesScreen;

