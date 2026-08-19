import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

const ActiveDictionaryBadge = (props) => {
    const { title } = props;

    return (
        <View style={styles.wrap}>
            <View style={styles.row}>
                <Icon
                    name="book"
                    size={17}
                    color={COLORS.lightRed}
                    style={styles.icon}
                />
                <Text style={styles.text}>{`Dictionary - ${title}`}</Text>
            </View>
        </View>
    );
};

ActiveDictionaryBadge.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: COLORS.white,
        borderTopRightRadius: 30,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightRed,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: COLORS.lightRed,
        fontSize: 17,
        textAlign: 'center',
    },
});

export default ActiveDictionaryBadge;
