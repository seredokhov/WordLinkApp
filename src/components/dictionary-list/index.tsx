import React from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { PublicDictionary } from '../../types';

type DictionaryListProps = {
    data: PublicDictionary[];
    selectedId: string | null;
    onSelect: (id: string) => void;
};

const DictionaryList = (props: DictionaryListProps) => {
    const { data, selectedId, onSelect } = props;

    const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));

    const renderItem = ({ item }: { item: PublicDictionary }) => {
        const isSelected = selectedId === item.id;

        return (
            <TouchableHighlight
                underlayColor={COLORS.gray}
                onPress={() => onSelect(item.id)}
                style={styles.button}
            >
                <View style={[styles.item, isSelected ? styles.itemSelected : undefined]}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{`${item.wordsCount} words`}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <View style={styles.wrap}>
            <FlatList
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        backgroundColor: COLORS.white,
    },
    button: {
        marginVertical: 1,
    },
    item: {
        backgroundColor: COLORS.lightGray,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    itemSelected: {
        backgroundColor: COLORS.gray,
    },
    title: {
        color: COLORS.lighterBlack,
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.darkGray,
        marginTop: 4,
    },
});

export default DictionaryList;

