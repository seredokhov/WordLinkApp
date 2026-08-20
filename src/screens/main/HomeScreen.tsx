import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import Content from '../../components/content';
import HomeTopContainer from '../../components/container/home-top-container';
import HomeContentContainer from '../../components/container/home-content-container';
import BorderedHeader from '../../components/header/bordered-header';
import { HeaderIconAction } from '../../components/header/actions';
import { HomeScreenProps } from '../../types';
import { ACTIVE_DICTIONARY_TYPE } from '../../constants/dictionary';

const HomeScreen = (props: HomeScreenProps) => {
    const { navigation } = props;

    const navigateToDictionaries = () => {
        navigation.navigate('Dictionaries');
    }

    const { store: { selectedWord, activeDictionary } } = useAppContext();
    const isRemoteDictionary = activeDictionary.type === ACTIVE_DICTIONARY_TYPE.REMOTE;
    const words = Object.values(activeDictionary.dictionary);

    const topHalfStyles = isRemoteDictionary
        ? undefined
        : [{ height: selectedWord.word ? 185 : 110 }];

    const rightContent = (isRemoteDictionary || !selectedWord.word) && (
        <HeaderIconAction icon="book" onPress={navigateToDictionaries} />
    );

    return (
        <View style={styles.screen}>
            <BorderedHeader rightContent={rightContent}>
                <Animated.View style={topHalfStyles}>
                    <HomeTopContainer
                        isRemoteDictionary={isRemoteDictionary}
                        selectedWord={selectedWord}
                    />
                </Animated.View>
            </BorderedHeader>
            <Content>
                <HomeContentContainer
                    isRemoteDictionary={isRemoteDictionary}
                    words={words}
                />
            </Content>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'stretch',
    },
});

export default HomeScreen;
