import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { COLORS } from '../../constants/theme';

type LoaderProps = {
    height?: DimensionValue;
    text?: string;
    backgroundColor?: string;
    color?: string;
    iconSize?: number;
};

const defaultProps = {
    height: '100%',
    iconSize: 30,
    text: '',
    backgroundColor: COLORS.white,
    color: COLORS.gray
} satisfies Partial<LoaderProps>;

const Loader = (props: LoaderProps) => {
    const {
        text,
        iconSize,
        height,
        backgroundColor,
        color
    } = { ...defaultProps, ...props };

    const preloaderStyles: StyleProp<ViewStyle> = [
        styles.preloader,
        { height, backgroundColor }
    ];

    return (
        <View style={preloaderStyles}>
            {
                text && (
                    <Text style={styles.text}>{text}</Text>
                )
            }
            <ActivityIndicator size={iconSize} color={color}/>
        </View>
    );
};

const styles = StyleSheet.create({
    preloader: {
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'sans-serif-condensed',
        color: COLORS.white,
        marginBottom: 5
    }
});

export default Loader
