import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { noop } from '../../utils';

type InputProps = {
    value?: string;
    maxLength?: number;
    placeholder?: string;
    icon?: string;
    iconText?: string;
    buttonIcon?: string;
    iconColor?: string;
    buttonIconColor?: string;
    buttonColor?: string;
    secureTextEntry?: boolean;
    onButtonPress?: () => void;
    onChangeText?: (value: string) => void;
};

const defaultProps = {
    value: '',
    placeholder : '',
    icon: '',
    iconText: '',
    buttonIcon: '',
    maxLength: undefined,
    iconColor: COLORS.lightRed,
    buttonIconColor: COLORS.white,
    secureTextEntry: false,
    onButtonPress: noop,
    onChangeText: noop
} satisfies Partial<InputProps>;

const Input = (props: InputProps) => {
    const {
        value,
        icon,
        iconText,
        iconColor,
        buttonIcon,
        buttonIconColor,
        placeholder,
        maxLength,
        secureTextEntry,
        onButtonPress,
        onChangeText,
    } = { ...defaultProps, ...props };

    const inputStyles: StyleProp<ViewStyle> = [
        styles.input,
        {
            paddingHorizontal: !(icon || iconText) ? 25 : 55
        }
    ];

    return (
        <View style={styles.wrap}>
            {
                icon && !iconText && (
                    <Icon
                        name={icon}
                        size={25}
                        style={styles.icon}
                        color={iconColor}
                    />
                )
            }
            {
                iconText && (
                    <View style={styles.customIcon}>
                        <Text style={styles.customIconText}>{iconText}</Text>
                    </View>
                )
            }
            <TextInput
                style={inputStyles}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
            />
            {
                buttonIcon && value && (
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={COLORS.gray}
                        disabled={!value}
                        onPress={onButtonPress}
                    >
                        <Icon
                            name={buttonIcon}
                            color={buttonIconColor}
                            size={30}
                        />
                    </TouchableHighlight>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    customIcon: {
        position: 'absolute',
        width: 45,
        height: 50,
        backgroundColor: COLORS.lightRed,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        left: 0,
        top: 0
    },
    customIconText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    wrap: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 25,
        overflow: 'hidden',
        position: 'relative'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: COLORS.white,
        backgroundColor: COLORS.lightRed,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10
    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 10
    },
    input: {
        color: COLORS.black,
        borderWidth: 0,
        backgroundColor: COLORS.white,
        fontSize: 20
    },
});

export default Input;
