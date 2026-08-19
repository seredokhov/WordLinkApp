import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { COLORS } from '../../constants/theme';

const Content = (props: ViewProps) => {
    const { children } = props;
    return (
        <View style={styles.wrap}>
            <View style={styles.content}>
                { children }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: COLORS.lightRed,
    },
    content: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 30,
    }
});

export default Content;
