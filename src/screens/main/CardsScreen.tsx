import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import { randomize } from '../../utils';
import CardsBlock from '../../components/card/cards-block';
import Content from '../../components/content';
import BorderedHeader from '../../components/header/bordered-header';
import { HeaderIconAction } from '../../components/header/actions';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../components/button';
import Loader from '../../components/loader';
import { CardScreenProps } from '../../types';
import { ACTIVE_DICTIONARY_TYPE } from '../../constants/dictionary';

const CardsScreen = (props: CardScreenProps) => {
    const { navigation } = props;
    const { store: { activeDictionary } } = useAppContext();
    const isRemoteDictionary = activeDictionary.type === ACTIVE_DICTIONARY_TYPE.REMOTE;
    const cardsData = useMemo(
        () => Object.values(activeDictionary.dictionary),
        [activeDictionary.dictionary]
    );
    const [cards, setCards] = useState(cardsData);
    const [isLoadedData, setLoadedData] = useState(false);
    const isFocused = useIsFocused();

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const shuffleCards = useCallback(() => {
        if (cardsData.length === 0) {
            setLoadedData(true);
            return;
        }

        setCards(randomize(cardsData));
        setLoadedData(true);
    }, [cardsData]);

    const back = () => {
        navigation.navigate('Home');
    };

    useEffect(() => {
        setLoadedData(false);
        if (!isFocused) {
            return;
        }

        shuffleCards();
    }, [isFocused, activeDictionary.id, activeDictionary.dictionary, shuffleCards]);

    const cardsBlock = useMemo(
        () => (
            <CardsBlock
                cardsData={cards}
                onRefresh={shuffleCards}
                dictionaryTitle={isRemoteDictionary ? activeDictionary.title : undefined}
            />
        ),
        [cards, shuffleCards, isRemoteDictionary, activeDictionary.title]
    );

    const renderContent = () => {
        if (cardsData.length > 0) {
            return cardsBlock;
        }

        return (
            <Fragment>
                <Text style={styles.message}>Add words for unblock this functionality</Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        text="Add words"
                        backgroundColor={COLORS.lightRed}
                        onPress={back}
                    />
                </View>
            </Fragment>
        );
    };

    return (
        <View style={styles.page}>
            <BorderedHeader
                leftContent={<HeaderIconAction icon="arrow-back-outline" onPress={back} />}
                rightContent={<HeaderIconAction icon="person-circle" onPress={navigateToProfile} />}
            >
                <Text style={styles.title}>Cards</Text>
            </BorderedHeader>
            <Content>
                <View style={[styles.contentWrap]}>
                    {
                        !isLoadedData ? (
                            <Loader iconSize={50} />
                        ) : (
                            renderContent()
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
        backgroundColor: COLORS.red,
    },
    contentWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsContainer: {
        width: 220
    }
});

export default CardsScreen;
