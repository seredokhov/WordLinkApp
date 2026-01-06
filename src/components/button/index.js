import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const Button = props => {
    const {
        text,
        disabled,
        active,
        color,
        backgroundColor,
        underlayColor,
        onPress = () => {}
    } = { ...defaultProps, ...props };

    const buttonStyles = [
        styles.button,
        { backgroundColor },
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
                <Text style={textStyles}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 90,
        height: 50,
        borderRadius: 25,
        padding: 10
    },
    buttonDisabled: {
        opacity: .6
    },
    buttonActive: {
        backgroundColor: COLORS.darkRed
    },
    buttonInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18
    },
});

const defaultProps = {
    disabled: false,
    active: false,
    color: COLORS.white,
    backgroundColor: COLORS.lighterRed,
    underlayColor: COLORS.darkerRed,
    onPress: () => {}
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func
};

export default Button;
