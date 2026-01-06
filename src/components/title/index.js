import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Title = props => {
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


const defaultProps = {
    iconName: ''
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
    iconName: PropTypes.string
};

export default Title;
