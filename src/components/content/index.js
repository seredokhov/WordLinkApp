import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const Content = props => {
    const { children } = props;
    return (
        <View style={styles.wrap}>
            <View style={styles.content}>
                { children }
            </View>
        </View>
    );
};

Content.propTypes = {
    children: PropTypes.node.isRequired
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
