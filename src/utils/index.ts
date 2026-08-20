import { Animated } from 'react-native';
import type { StackCardStyleInterpolator } from '@react-navigation/stack';
import type { AxiosError } from 'axios';
import type { BaseWord, PracticeCard, Word, WordsToSynchronize } from '../types';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const noop = () => {};

const randomize = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};

const getRandomTranslations = (
    data: Record<string, BaseWord>,
    excludeTranslation: string,
    limit: number,
): string[] => {
    const translations = Object.values(data).map(entity => entity.translate);
    const filteredTranslations = translations.filter(translation => translation !== excludeTranslation);
    const uniqueTranslations = [...new Set(filteredTranslations)];
    const maxLength = Math.min(uniqueTranslations.length, limit - 1);
    const randomTranslations: string[] = [];

    for (let i = 0; i < maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueTranslations.length);

        randomTranslations.push(uniqueTranslations[randomIndex]);
        uniqueTranslations.splice(randomIndex, 1);
    }

    return randomTranslations;
};

const getRandomEntities = <T extends BaseWord>(
    data: Record<string, T>,
    entitiesLimit: number,
    translationsLimit: number,
): PracticeCard<T>[] => {
    const selectedEntities = Object.keys(data).sort(() => Math.random() - 0.5).slice(0, entitiesLimit);
    const result: PracticeCard<T>[] = [];

    selectedEntities.forEach(entity => {
        const translation = data[entity].translate;
        const randomTranslations = getRandomTranslations(data, translation, translationsLimit);
        const suggestions = randomize([translation, ...randomTranslations]);

        result.push({
            entity: data[entity],
            suggestions,
            translation
        });
    });

    return result;
};

const errorHandler = (err: unknown): string => {
    if (typeof err === 'string') {
        return err;
    }

    const axiosError = err as AxiosError<{ message?: string }>;
    if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
    }

    return 'Something wrong';
};

const prepareWordsToSynchronize = (
    local: Word[],
    remote: Word[],
): WordsToSynchronize => {
    const combinedWords = local.reduce<WordsToSynchronize>((result, localItem) => {
        const remoteItem = remote.find((item) => item.id === localItem.id);

        if (!remoteItem) {
            if (!result.toCreate) {
                result.toCreate = {};
            }
            result.toCreate[localItem.word] = { ...localItem };
        }

        if (remoteItem && new Date(localItem.lastUpdate) > new Date(remoteItem.lastUpdate)) {
            if (!result.toUpdate) {
                result.toUpdate = {};
            }
            result.toUpdate[localItem.word] = { ...localItem };
        }

        return result;
    }, {
        toCreate: null,
        toDownload: null,
        toUpdate: null
    });

    remote.forEach((remoteItem) => {
        if (local.find((localItem) => localItem.id === remoteItem.id)) {
            return;
        }

        if (!combinedWords.toDownload) {
            combinedWords.toDownload = {};
        }
        combinedWords.toDownload[remoteItem.word] = { ...remoteItem };
    });

    return combinedWords;
};

const forFadeScreenAnimation: StackCardStyleInterpolator = ({ current }) => ({
    cardStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    },
});

const forSlideScreenAnimation: StackCardStyleInterpolator = ({
    current,
    next,
    inverted,
    layouts: { screen },
}) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width,
                                0,
                                screen.width * -0.3,
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};

const resetToApp = (navigation: NavigationProp<ParamListBase>): void => {
    let rootNavigation: NavigationProp<ParamListBase> = navigation;
    let parent = navigation.getParent();
    while (parent) {
        rootNavigation = parent;
        parent = parent.getParent();
    }
    rootNavigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
    });
};

export {
    noop,
    resetToApp,
    randomize,
    getRandomEntities,
    errorHandler,
    prepareWordsToSynchronize,
    forFadeScreenAnimation,
    forSlideScreenAnimation
};
