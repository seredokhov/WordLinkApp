import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants/theme';

const IconButton = props => {
    const {
        text,
        icon,
        disabled,
        active,
        color,
        backgroundColor,
        borderColor,
        underlayColor,
        onPress
    } = { ...defaultProps, ...props };

    const buttonStyles = [
        styles.button,
        { backgroundColor, borderColor },
        borderColor && styles.buttonBordered,
        disabled && styles.buttonDisabled,
        active && styles.buttonActive
    ];

    const textStyles = [
        styles.buttonText,
        { color }
    ];


    return (
        <TouchableHighlight
            style={buttonStyles}
            underlayColor={underlayColor}
            disabled={disabled}
            onPress={onPress}
        >
            <View style={styles.buttonInner}>
                <Icon name={icon} size={30} color={color} />
                {
                    text && (
                        <Text style={textStyles}>{text}</Text>
                    )
                }
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 67,
        height: 80,
        borderRadius: SIZES.radius,
        padding: 10,
    },
    buttonDisabled: {
        opacity: .6
    },
    buttonActive: {
        backgroundColor: COLORS.darkRed
    },
    buttonBordered: {
      borderWidth: 1,
    },
    buttonInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 11
    },
});

const defaultProps = {
    disabled: false,
    active: false,
    color: COLORS.white,
    backgroundColor: COLORS.lighterRed,
    underlayColor: COLORS.darkerRed,
    text: '',
    icon: '',
    onPress: () => {}
};

IconButton.propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    underlayColor: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func
};

export default IconButton;
