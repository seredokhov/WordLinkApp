import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Content from '../../components/content';
import BorderedHeader from '../../components/header/bordered-header';
import { HeaderIconAction } from '../../components/header/actions';
import { COLORS } from '../../constants/theme';
import { DictionariesScreenProps, PublicDictionary } from '../../types';
import { useAppContext } from '../../store/context';
import { SetError } from '../../store/actions';
import { errorHandler } from '../../utils';
import Loader from '../../components/loader';
import DictionaryService from '../../services/dictionary-service';
import DictionaryList from '../../components/dictionary-list';

const DictionariesScreen = (props: DictionariesScreenProps) => {
    const { navigation } = props;
    const { store: { user }, dispatch } = useAppContext();
    const [dictionaries, setDictionaries] = useState<PublicDictionary[]>([]);
    const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const goHome = () => {
        navigation.navigate('Home');
    };

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    useEffect(() => {
        if (!user?.token) {
            setIsLoading(false);
            return;
        }

        DictionaryService.getDictionaries(user.token)
            .then((responseDictionaries) => {
                setDictionaries(responseDictionaries);
            })
            .catch((err) => dispatch(SetError(errorHandler(err))))
            .finally(() => setIsLoading(false));
    }, [dispatch, user?.token]);

    const renderContent = () => {
        if (isLoading) {
            return <Loader iconSize={50} />;
        }

        if (!user?.token) {
            return (
                <View style={styles.messageWrap}>
                    <Text style={styles.message}>Login is required to load dictionaries.</Text>
                </View>
            );
        }

        if (!dictionaries.length) {
            return (
                <View style={styles.messageWrap}>
                    <Text style={styles.message}>No dictionaries yet.</Text>
                </View>
            );
        }

        return (
            <DictionaryList
                data={dictionaries}
                selectedId={selectedDictionaryId}
                onSelect={setSelectedDictionaryId}
            />
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
    messageWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default DictionariesScreen;

