import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import DictionaryNavigator from '../../navigators/DictionaryNavigator';
import Content from '../../components/content';
import WordContainer from '../../components/container/word-container';
import SearchContainer from '../../components/container/search-container';
import BorderedHeader from '../../components/header/bordered-header';
import { HeaderIconAction } from '../../components/header/actions';
import { HomeScreenProps } from '../../types';

const HomeScreen = (props: HomeScreenProps) => {
    const { navigation } = props;

    const navigateToDictionaries = () => {
        navigation.navigate('Dictionaries');
    }

    const { store: { selectedWord } } = useAppContext();

    const topHalfStyles = [
        {
            height: selectedWord.word ? 185 : 110
        }
    ];
    const rightContent = !selectedWord.word && (
        <HeaderIconAction
            icon="book"
            onPress={navigateToDictionaries}
            bordered
        />
    );

    return (
        <View style={styles.screen}>
            <BorderedHeader rightContent={rightContent}>
                <Animated.View style={topHalfStyles}>
                    {
                        selectedWord.word ?
                            <WordContainer /> :
                            <SearchContainer />
                    }
                </Animated.View>
            </BorderedHeader>
            <Content>
                <DictionaryNavigator />
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
