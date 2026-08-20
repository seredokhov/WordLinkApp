import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PublicDictionary } from '../../types';
import DictionaryListItem from './dictionary-list-item';

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
            <DictionaryListItem
                item={item}
                isSelected={isSelected}
                onPress={() => onSelect(item.id)}
            />
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
        flex: 1,
        width: '100%',
    }
});

export default DictionaryList;

