import React from 'react';
import { Text, TouchableHighlight, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/theme';
import { noop } from '../../utils';

type ButtonProps = {
    text: string;
    disabled?: boolean;
    active?: boolean;
    color?: string;
    backgroundColor?: string;
    underlayColor?: string;
    onPress?: () => void;
};


const defaultProps = {
    disabled: false,
    active: false,
    color: COLORS.white,
    backgroundColor: COLORS.lighterRed,
    underlayColor: COLORS.darkerRed,
    onPress: noop
} satisfies Partial<ButtonProps>;

const Button = (props: ButtonProps) => {
    const {
        text,
        disabled,
        active,
        color,
        backgroundColor,
        underlayColor,
        onPress
    } = { ...defaultProps, ...props };

    const buttonStyles: StyleProp<ViewStyle> = [
        styles.button,
        { backgroundColor },
        disabled ? styles.buttonDisabled : undefined,
        active ? styles.buttonActive : undefined
    ];

    const textStyles: StyleProp<TextStyle> = [
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

export default Button;
