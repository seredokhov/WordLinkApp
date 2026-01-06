import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const Tab = props => {
    const {
        label,
        count,
        icon,
        size,
        fontSize,
        color,
        type
    } = { ...defaultProps, ...props };

    const tabStyles = [
        styles.tab,
        {
            flexDirection: type,
        }
    ];

    const labelStyles = [
        styles.label,
        {
            marginLeft: type === 'row' ? SIZES.baseMargin : 0,
            color,
            fontSize
        }
    ];

    return (
        <View style={tabStyles}>
            <Icon
                name={icon}
                size={size}
                color={color}
            />
            <View>
                <Text style={labelStyles}>{label}</Text>
            </View>
            <View>
                <Text style={labelStyles}>{count}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center'
    }
});

const defaultProps = {
    type: 'column',
    label: '',
    count: null,
    fontSize: 13,
    color: COLORS.gray
};

Tab.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    fontSize: PropTypes.number,
    label: PropTypes.string,
    count: PropTypes.number,
    color: PropTypes.string,
    type: PropTypes.string
};

export default Tab;
