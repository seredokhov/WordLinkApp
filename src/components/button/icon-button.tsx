import React from 'react';
import { Text, TouchableHighlight, View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../../constants/theme';
import { noop } from '../../utils';

type IconButtonProps = {
    disabled?: boolean;
    active?: boolean;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    underlayColor?: string;
    text?: string;
    icon?: string;
    onPress?: () => void;
};

const defaultProps = {
    disabled: false,
    active: false,
    color: COLORS.white,
    backgroundColor: COLORS.lighterRed,
    underlayColor: COLORS.darkerRed,
    text: '',
    icon: '',
    onPress: noop
} satisfies Partial<IconButtonProps>;

const IconButton = (props: IconButtonProps) => {
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

    const buttonStyles: StyleProp<ViewStyle> = [
        styles.button,
        { backgroundColor, borderColor },
        borderColor ? styles.buttonBordered : undefined,
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

export default IconButton;
