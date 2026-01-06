import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const BorderedHeader = props => {
    const {
        leftBtnIcon,
        rightBtnIcon,
        children,
        onLeftBtnPress,
        onRightBtnPress
    } = { ...defaultProps, ...props };

    const leftIcon = leftBtnIcon || 'arrow-back-outline';
    const rightIcon = rightBtnIcon || 'ios-refresh';

    return (
        <View style={styles.wrap}>
            <View style={styles.header}>
                {
                    onLeftBtnPress && (
                        <TouchableHighlight
                            style={[styles.btn, styles.leftBtn]}
                            underlayColor={COLORS.lightRed}
                            onPress={onLeftBtnPress}
                        >
                            <Icon
                                name={leftIcon}
                                color={COLORS.white}
                                size={30}
                            />
                        </TouchableHighlight>
                    )
                }
                { children }
                {
                    onRightBtnPress && (
                        <TouchableHighlight
                            style={[styles.btn, styles.rightBtn]}
                            onPress={onRightBtnPress}
                            underlayColor={COLORS.lightRed}
                        >
                            <Icon
                                name={rightIcon}
                                color={COLORS.white}
                                size={30}
                            />
                        </TouchableHighlight>
                    )
                }
            </View>
        </View>
    );
};

const defaultProps = {
    leftBtnIcon: '',
    rightBtnIcon: '',
    onLeftBtnPress: undefined,
    onRightBtnPress: undefined,
};

BorderedHeader.propTypes = {
    children: PropTypes.node.isRequired,
    leftBtnIcon: PropTypes.string,
    rightBtnIcon: PropTypes.string,
    onLeftBtnPress: PropTypes.func,
    onRightBtnPress: PropTypes.func,
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
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 40,
        height: 40,
        top: 15,
        zIndex: 10,
    },
    leftBtn: {
        left: 20,
    },
    rightBtn: {
        right: 20,
    }
});

export default BorderedHeader;
