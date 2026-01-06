import React from "react";
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants/theme';

const Loader = props => {
    const {
        text,
        iconSize,
        height,
        backgroundColor,
        color
    } = { ...defaultProps, ...props };

    const preloaderStyles = [
        styles.preloader,
        {
            height,
            backgroundColor
        }
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

const defaultProps = {
    height: '100%',
    iconSize: 30,
    text: '',
    backgroundColor: COLORS.white,
    color: COLORS.gray
};

Loader.propTypes = {
    iconSize: PropTypes.number.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
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
