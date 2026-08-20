import React from 'react';
import { StyleSheet, Text, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type BaseTitleProps = {
    title: string;
    iconName?: string;
    iconSize?: number;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<TextStyle>;
};

const defaultProps = {
    iconName: '',
    iconSize: 50,
};

const BaseTitle = (props: BaseTitleProps) => {
    const {
        title,
        iconName,
        iconSize,
        style,
        titleStyle,
        iconStyle,
    } = { ...defaultProps, ...props };

    return (
        <View style={[styles.title, style]}>
            {
                iconName ? (
                    <Icon
                        style={[styles.icon, iconStyle]}
                        name={iconName}
                        size={iconSize}
                    />
                ) : null
            }
            <Text style={[styles.titleText, titleStyle]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        marginRight: 10,
    },
});

export default BaseTitle;
