import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const CheckConnection = props => {
    const { text } = { ...defaultProps, ...props };

    return (
        <View style={styles.wrap}>
            <Icon name="earth" size={40} color={COLORS.darkerGray}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        color: COLORS.darkerGray,
        textAlign: 'center',
        fontSize: 19
    }
});

const defaultProps = {
    text: 'Check your internet connection'
};

CheckConnection.propTypes = {
    text: PropTypes.string
};

export default CheckConnection;
