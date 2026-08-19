import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const RemoteWord = (props) => {
    const {
        name,
        translate,
        isAdded,
        onActionPress
    } = props;

    return (
        <View style={styles.button}>
            <View style={styles.word}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.translate}>{translate}</Text>
                </View>
                <TouchableOpacity onPress={onActionPress}>
                    <Icon
                        name={isAdded ? 'checkmark-circle' : 'add'}
                        size={24}
                        color={isAdded ? COLORS.lightRed : COLORS.darkGray}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

RemoteWord.propTypes = {
    name: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    isAdded: PropTypes.bool.isRequired,
    onActionPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 1,
    },
    word: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: COLORS.white,
        backgroundColor: COLORS.lightGray,
    },
    name: {
        color: COLORS.lighterBlack,
        fontSize: 16,
    },
    translate: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
});

export default RemoteWord;
