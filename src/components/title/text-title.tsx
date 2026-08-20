import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import BaseTitle from './base-title';

type TextTitleProps = {
    title: string;
    iconStyle?: StyleProp<ViewStyle>;
    iconName?: string;
};

const defaultProps = {
    iconName: '',
};

const TextTitle = (props: TextTitleProps) => {
    const { title, iconName, iconStyle } = { ...defaultProps, ...props };

    return (
        <BaseTitle
            title={title}
            iconName={iconName}
            iconSize={50}
            style={styles.wrap}
            titleStyle={styles.titleText}
            iconStyle={iconStyle}
        />
    );
};

const styles = StyleSheet.create({
    wrap: {
        marginBottom: 15,
    },
    titleText: {
        fontSize: 30,
    },
});

export default TextTitle;
