import React from 'react';
import { StyleSheet } from 'react-native';
import BaseTitle from './base-title';
import { COLORS, SIZES } from '../../constants/theme';

type TextTitleProps = {
    title: string;
    iconName?: string;
};

const defaultProps = {
    iconName: '',
};

const Title = (props: TextTitleProps) => {
    const { title, iconName } = { ...defaultProps, ...props };

    return (
        <BaseTitle
            title={title}
            iconName={iconName}
            iconSize={30}
            style={styles.wrap}
            titleStyle={styles.titleText}
            iconStyle={styles.iconStyle}
        />
    );
};

const styles = StyleSheet.create({
    wrap: {
        marginBottom: 10,
    },
    iconStyle: {
        color: COLORS.white,
        marginTop: 5
    },
    titleText: {
        fontSize: SIZES.h1,
        color: COLORS.white,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
});

export default Title;
