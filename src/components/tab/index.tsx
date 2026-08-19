import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

type TabProps = {
    icon: string;
    type: "column" | "row" | "row-reverse" | "column-reverse" | undefined;
    color?: string;
    count?: number;
    label?: string;
    size?: number;
    fontSize?: number;
};

const defaultProps = {
    type: 'column',
    label: '',
    count: null,
    fontSize: 13,
    color: COLORS.gray
};

const Tab = (props: TabProps) => {
    const {
        label,
        count,
        icon,
        size,
        fontSize,
        color,
        type
    } = { ...defaultProps, ...props };

    const tabStyles: StyleProp<ViewStyle> = [
        styles.tab,
        { flexDirection: type }
    ];

    const labelStyles: StyleProp<TextStyle> = [
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

export default Tab;
