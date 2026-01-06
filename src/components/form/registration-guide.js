import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const RegistrationGuide = props => {
    const {
        title,
        children
    } = props;
    return (
        <View style={styles.guide}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    guide: {
        width: 300
    },
    title: {
        fontSize: 25,
        color: COLORS.white,
        marginBottom: 15,
        paddingHorizontal: 25,
        textAlign: 'center'
    }
});

export default RegistrationGuide;
