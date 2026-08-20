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
    const progress = item.progress;
    const hasProgress = !!progress;
    const progressPercent = Math.min(Math.max(progress?.bestProgressPercent ?? 0, 0), 100);
    const isCompleted = hasProgress && progressPercent >= 100;

    const subtitle = (() => {
        if (!hasProgress) {
            return `${item.wordsCount} words`;
        }

        if (isCompleted) {
            return `${item.wordsCount} words · Completed`;
        }

        return `${item.wordsCount} words · ${progress.bestCorrectAnswers} correct`;
    })();

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
                    <View style={styles.subtitleRow}>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                        {
                            hasProgress && (
                                <Text style={styles.progressText}>{`${progressPercent}%`}</Text>
                            )
                        }
                    </View>

                    {
                        hasProgress && (
                            <View style={styles.progressBlock}>
                                <View style={styles.progressTrack}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${progressPercent}%` }
                                        ]}
                                    />
                                </View>
                            </View>
                        )
                    }
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
    subtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    subtitle: {
        flex: 1,
        fontSize: 12,
        color: COLORS.darkGray,
        marginRight: 8,
    },
    progressBlock: {
        marginTop: 8,
    },
    progressTrack: {
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.lightGray,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
        backgroundColor: COLORS.lightRed,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.darkGray,
    },
    rightIcon: {
        marginLeft: 12,
    },
});

export default DictionaryListItem;
