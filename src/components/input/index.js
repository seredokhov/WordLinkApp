import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const Input = props => {
    const {
        value,
        icon,
        iconText,
        iconColor,
        buttonIcon,
        buttonIconColor,
        onButtonPress,
        onChangeText,
        placeholder,
        maxLength,
        secureTextEntry
    } = { ...defaultProps, ...props };

    const inputStyles = [
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

const defaultProps = {
    value: '',
    maxLength: null,
    placeholder : '',
    icon: '',
    iconText: '',
    buttonIcon: '',
    iconColor: COLORS.lightRed,
    buttonIconColor: COLORS.white,
    secureTextEntry: false,
    onButtonPress: () => {},
    onChangeText: () => {}
};

Input.propTypes = {
    value: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder : PropTypes.string,
    icon: PropTypes.string,
    iconText: PropTypes.string,
    buttonIcon: PropTypes.string,
    iconColor: PropTypes.string,
    buttonIconColor: PropTypes.string,
    onButtonPress: PropTypes.func,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool
};

export default Input;
