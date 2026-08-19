import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const BorderedHeader = props => {
    const {
        leftContent,
        rightContent,
        children
    } = { ...defaultProps, ...props };

    return (
        <View style={styles.wrap}>
            <View style={styles.header}>
                {
                    leftContent && (
                        <View style={styles.leftSlot}>
                            {leftContent}
                        </View>
                    )
                }
                { children }
                {
                    rightContent && (
                        <View style={styles.rightSlot}>
                            {rightContent}
                        </View>
                    )
                }
            </View>
        </View>
    );
};

const defaultProps = {
    leftContent: undefined,
    rightContent: undefined,
};

BorderedHeader.propTypes = {
    children: PropTypes.node.isRequired,
    leftContent: PropTypes.node,
    rightContent: PropTypes.node,
};

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: COLORS.white,
        position: 'relative'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.lightRed,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        minHeight: 80,
    },
    leftSlot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 17,
        left: 20,
        zIndex: 10,
    },
    rightSlot: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 17,
        right: 20,
        zIndex: 10,
    },
});

export default BorderedHeader;
