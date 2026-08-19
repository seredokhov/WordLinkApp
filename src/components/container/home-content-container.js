import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppContext } from '../../store/context';
import DictionaryNavigator from '../../navigators/DictionaryNavigator';
import RemoteWordList from '../word-list/remote-word-list';
import ActiveDictionaryBadge from '../active-dictionary-badge';

const HomeContentContainer = (props) => {
    const { isRemoteDictionary, words } = props;
    const { store: { activeDictionary } } = useAppContext();

    if (isRemoteDictionary) {
        return (
            <View style={styles.remoteContentWrap}>
                <ActiveDictionaryBadge title={activeDictionary.title} />
                <RemoteWordList data={words} />
            </View>
        );
    }

    return <DictionaryNavigator />;
};

HomeContentContainer.propTypes = {
    isRemoteDictionary: PropTypes.bool.isRequired,
    words: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    remoteContentWrap: {
        flex: 1,
    },
});

export default HomeContentContainer;
