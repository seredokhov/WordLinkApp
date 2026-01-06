import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const Header = props => {
    const {
        children,
        onLeftBtnPress,
    } = { ...defaultProps, ...props };

    return (
        <View style={styles.wrap}>
            {
                onLeftBtnPress && (
                    <TouchableHighlight
                        style={[styles.btn, styles.leftBtn]}
                        underlayColor={COLORS.lightRed}
                        onPress={onLeftBtnPress}
                    >
                        <Icon
                            name="arrow-back-outline"
                            color={COLORS.white}
                            size={30}
                        />
                    </TouchableHighlight>
                )
            }
            { children }
        </View>
    );
};

const defaultProps = {
    onLeftBtnPress: undefined,
    onRightBtnPress: undefined,
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    onLeftBtnPress: PropTypes.func,
    onRightBtnPress: PropTypes.func,
};

const styles = StyleSheet.create({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.lightRed,
        paddingHorizontal: 20,
        paddingTop: 15
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 40,
        height: 40,
        top: 15,
        left: 20,
        zIndex: 10,
    }
});

export default Header;
