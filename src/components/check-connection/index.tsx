import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

type CheckConnectionProps = {
    text: string;
};

const defaultProps = {
    text: 'Check your internet connection'
};

const CheckConnection = (props: CheckConnectionProps) => {
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

export default CheckConnection;
