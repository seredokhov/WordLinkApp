import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const EmptyCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.noMoreCardsText}>No more cards</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 470,
        backgroundColor: COLORS.lightRed,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    noMoreCardsText: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        fontSize: 22,
        position: 'static',
        backgroundColor: '#217a00'
    }
});

export default EmptyCard;
