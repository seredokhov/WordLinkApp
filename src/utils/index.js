import { Animated } from "react-native";

const randomize = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
};

const getRandomTranslations = (data, excludeTranslation, limit) => {
    const translations = Object.values(data).map(entity => entity.translate);
    const filteredTranslations = translations.filter(translation => translation !== excludeTranslation);
    const uniqueTranslations = [...new Set(filteredTranslations)];
    const maxLength = Math.min(uniqueTranslations.length, limit - 1);
    const randomTranslations = [];

    for (let i = 0; i < maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueTranslations.length);

        randomTranslations.push(uniqueTranslations[randomIndex]);
        uniqueTranslations.splice(randomIndex, 1);
    }

    return randomTranslations;
};

const getRandomEntities = (data, entitiesLimit, translationsLimit) => {
    const selectedEntities = Object.keys(data).sort(() => Math.random() - 0.5).slice(0, entitiesLimit);
    const result = [];

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

const errorHandler = err => {
    if (err.response) {
        return err.response.data.message;
    }

    if (typeof err === 'string') {
        return err;
    }

    return 'Something wrong';
}

const prepareWordsToSynchronize = (local, remote) => {
    const combinedWords = local.reduce((result, localItem) => {
        const remoteItem = remote.find((item) => item.id === localItem.id);

        if (!remoteItem) {
            !result.toCreate && (result.toCreate = {});
            result.toCreate[localItem.word] = { ...localItem };
        }

        if (remoteItem && new Date(localItem.lastUpdate) > new Date(remoteItem.lastUpdate)) {
            !result.toUpdate && (result.toUpdate = {});
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

        !combinedWords.toDownload && (combinedWords.toDownload = {})
        combinedWords.toDownload[remoteItem.word] = { ...remoteItem };
    });

    return combinedWords;
};

const forFadeScreenAnimation = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

const forSlideScreenAnimation = ({ current, next, inverted, layouts: { screen } }) => {
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
                                screen.width, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                screen.width * -0.3, // Fully unfocused
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

export {
    randomize,
    getRandomEntities,
    errorHandler,
    prepareWordsToSynchronize,
    forFadeScreenAnimation,
    forSlideScreenAnimation
};
