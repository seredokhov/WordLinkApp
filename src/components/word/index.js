import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../../constants/theme";

const Word = props => {
    const {
        name,
        translate,
        isFavorite,
        isLearned,
        isSelected,
        onPress
    } = props;

    const iconFavoriteColor = (isFavorite || isSelected) ? COLORS.lightRed : COLORS.gray;
    const iconFavoriteName = isFavorite ? 'star' : 'star-outline';

    const iconLearnedColor = isSelected ? COLORS.lightRed : COLORS.gray;

    const wordStyles = [
        styles.word,
        {
            backgroundColor: isSelected ? COLORS.gray : COLORS.lightGray
        }
    ];

    return (
        <TouchableHighlight
            style={styles.button}
            underlayColor={COLORS.gray}
            onPress={onPress}
        >
            <View style={wordStyles}>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.translate}>{translate}</Text>
                </View>
                <View style={styles.iconsContainer}>
                    {
                        isLearned && (
                            <Icon
                                name={"flag-outline"}
                                size={25}
                                color={iconLearnedColor}
                                style={styles.iconLearned}
                            />
                        )
                    }
                    <Icon
                        name={iconFavoriteName}
                        size={25}
                        color={iconFavoriteColor}
                    />
                </View>
            </View>
        </TouchableHighlight>
    );
};

Word.propTypes = {
    name: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    isLearned: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 1,
    },
    word: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: COLORS.white,
    },
    name: {
        color: COLORS.lighterBlack,
        fontSize: 16,
    },
    translate: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconLearned: {
        marginRight: 5
    }
});

export default Word;
