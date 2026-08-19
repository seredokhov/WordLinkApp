import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const CardBackDictionaryBadge = (props) => {
    const { title } = props;

    return (
        <View style={styles.wrap}>
            <Icon
                name="book"
                size={16}
                color={COLORS.white}
                style={styles.icon}
            />
            <Text style={styles.text}>{`From ${title}`}</Text>
        </View>
    );
};

CardBackDictionaryBadge.propTypes = {
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lighterRed,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default CardBackDictionaryBadge;
