import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useAppContext } from '../../store/context';
import DictionaryNavigator from '../../navigators/DictionaryNavigator';
import Content from '../../components/content';
import WordContainer from '../../components/container/word-container';
import SearchContainer from '../../components/container/search-container';
import BorderedHeader from '../../components/header/bordered-header';

const HomeScreen = props => {
    const { navigation } = props;

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const { store: { selectedWord } } = useAppContext();

    const topHalfStyles = [
        {
            height: selectedWord.word ? 185 : 110
        }
    ];

    return (
        <View style={styles.screen}>
            <BorderedHeader rightBtnIcon="person-circle" onRightBtnPress={navigateToProfile}>
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
    }
});

export default HomeScreen;
