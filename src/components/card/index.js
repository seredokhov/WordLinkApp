import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { noop } from '../../utils';

const Card = props => {
    const {
        title,
        backgroundColor = COLORS.lightRed,
        textColor = COLORS.white,
        children,
        onPress = noop,
        contentStyle
    } = props;

    const cardStyles = useMemo(
        () => [styles.card, { backgroundColor }, contentStyle],
        [backgroundColor, contentStyle]
    );

    const textStyles = useMemo(
        () => [styles.label, { color: textColor }],
        [textColor]
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={cardStyles}
            onPress={onPress}
        >
            <Text style={textStyles}>{title}</Text>
            {
                children && (
                    <View>{children}</View>
                )
            }
        </TouchableOpacity>
    );
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

export default memo(Card);
