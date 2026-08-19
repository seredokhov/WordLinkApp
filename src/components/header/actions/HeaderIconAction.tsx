import React from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

type HeaderIconActionProps = {
    icon: string;
    bordered?: boolean,
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
};

const HeaderIconAction = (props: HeaderIconActionProps) => {
    const { icon, bordered, style, onPress } = props;

    return (
        <TouchableHighlight
            style={[styles.btn, bordered && styles.btnBordered, style]}
            underlayColor={COLORS.lightRed}
            onPress={onPress}
        >
            <Icon name={icon} color={COLORS.white} size={30} />
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    btn: {
        // width: 40,
        // height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    btnBordered: {
        borderWidth: 1,
        borderColor: COLORS.white,
        borderStyle: 'solid',
        borderRadius: 5,
    }
});

export default HeaderIconAction;

