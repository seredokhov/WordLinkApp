import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const Card = props => {
    const {
        title,
        backgroundColor,
        textColor,
        children,
        onPress,
        contentStyle
    } = { ...defaultProps, ...props };

    const cardStyles = [
        styles.card,
        { backgroundColor },
        contentStyle
    ];

    const textStyles = [
        { color: textColor }
    ];

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={cardStyles}
            onPress={onPress}
        >
            <Text style={[styles.label, textStyles]}>{title}</Text>
            {
                children && (
                    <View>{children}</View>
                )
            }
        </TouchableOpacity>
    )
};

const defaultProps = {
    backgroundColor: COLORS.lightRed,
    textColor: COLORS.white,
    onPress: () => null,
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
    contentStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        padding: 20,
    },
    label: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '700',
        fontFamily: 'System',
        marginBottom: 20
    },
});

export default Card;
