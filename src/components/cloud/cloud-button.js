import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const CloudButton = props => {
    const {
        iconName,
        text,
        disabled,
        onPress
    } = props;

    const color = disabled ? COLORS.darkerGray : COLORS.white;

    const buttonStyles = [
        styles.button,
        disabled && styles.buttonDisabled
    ];

    const buttonTextStyles = [
        styles.buttonText,
        { color }
    ];

    return (
        <TouchableHighlight
            style={buttonStyles}
            underlayColor={COLORS.darkerRed}
            disabled={disabled}
            onPress={onPress}
        >
            <View style={styles.buttonInner}>
                <Icon name={iconName} size={30} color={color} />
                <Text style={buttonTextStyles}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

CloudButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightRed,
        padding: 15,
        borderRadius: 10,
        width: '48%'
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray,
        opacity: .6
    },
    buttonInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
    },
});

export default CloudButton;
