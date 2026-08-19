import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TitleProps = {
    title: string;
    iconName?: string;
};

const defaultProps = {
    iconName: ''
};

const Title = (props: TitleProps) => {
    const { title, iconName } = { ...defaultProps, ...props };

    return (
        <View style={styles.title}>
            {
                iconName && (
                     <Icon
                         style={styles.icon}
                         name={iconName}
                         size={50}
                     />
                )
            }
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        marginRight: 10
    }
});

export default Title;
