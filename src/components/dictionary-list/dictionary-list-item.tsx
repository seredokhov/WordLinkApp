import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { PublicDictionary } from '../../types';

type DictionaryListItemProps = {
    item: PublicDictionary;
    isSelected: boolean;
    onPress: () => void;
};

const DictionaryListItem = (props: DictionaryListItemProps) => {
    const { item, isSelected, onPress } = props;
    const rightIconName = isSelected ? 'checkbox' : 'square-outline';
    const rightIconColor = isSelected ? COLORS.lightRed : COLORS.gray;

    return (
        <TouchableHighlight
            underlayColor={COLORS.lightGray}
            onPress={onPress}
            style={styles.button}
        >
            <View style={styles.item}>
                <View style={styles.badge}>
                    <Icon name="book" size={18} color={COLORS.white} />
                </View>

                <View style={styles.textBlock}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{`${item.wordsCount} words`}</Text>
                </View>

                <Icon
                    name={rightIconName}
                    size={26}
                    color={rightIconColor}
                    style={styles.rightIcon}
                />
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    badge: {
        width: 34,
        height: 34,
        borderRadius: 8,
        backgroundColor: COLORS.lightRed,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textBlock: {
        flex: 1,
    },
    title: {
        color: COLORS.lighterBlack,
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.darkGray,
        marginTop: 2,
    },
    rightIcon: {
        marginLeft: 12,
    },
});

export default DictionaryListItem;

