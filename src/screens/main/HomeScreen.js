import React, { useContext } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { ContextApp } from '../../store/context';
import DictionaryNavigator from '../../navigators/DictionaryNavigator';
import Content from '../../components/content';
import WordContainer from '../../components/container/word-container';
import SearchContainer from '../../components/container/search-container';
import BorderedHeader from '../../components/header/bordered-header';
import { useDisableBackGesture } from '../../utils/hooks';

const HomeScreen = props => {
    const { navigation } = props;

    useDisableBackGesture(navigation);

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const { store: { selectedWord } } = useContext(ContextApp);

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
