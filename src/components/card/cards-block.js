import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import { COLORS, SIZES } from '../../constants/theme';
import FlipCard from './flip-card';
import Button from '../button';

const CardsBlock = props => {
    const {
        cardsData,
        onRefresh,
        dictionaryTitle = ''
    } = props;

    const [noMore, setNoMore] = useState(cardsData.length === 0);

    useEffect(() => {
        if (cardsData.length > 0) {
            setNoMore(false);
        }
    }, [cardsData]);

    const renderCards = useCallback(
        card => (
            <FlipCard
                {...card}
                dictionaryTitle={dictionaryTitle}
            />
        ),
        [dictionaryTitle]
    );

    const swipeAll = useCallback(() => {
        setNoMore(true);
    }, []);

    const refresh = useCallback(() => {
        setNoMore(false);
        onRefresh();
    }, [onRefresh]);

    return (
        <View style={styles.container}>
            {
                !noMore && cardsData.length > 0 && (
                    <Swiper
                        cards={cardsData}
                        stackSize={6}
                        renderCard={renderCards}
                        stackSeparation={10}
                        onSwipedAll={swipeAll}
                        marginTop={30}
                        cardHorizontalMargin={(SIZES.width - 340) / 2}
                        backgroundColor={COLORS.white}
                    >
                    </Swiper>
                )
            }
            {
                noMore && (
                    <View style={styles.noMoreView}>
                        <Text style={styles.message}>No more cards</Text>
                        <View style={styles.buttonsContainer}>
                            <Button
                                text="Refresh"
                                backgroundColor={COLORS.lightRed}
                                onPress={refresh}
                            />
                        </View>
                    </View>
                )
            }
        </View>
    );
};

CardsBlock.propTypes = {
    cardsData: PropTypes.array.isRequired,
    onRefresh: PropTypes.func.isRequired,
    dictionaryTitle: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noMoreView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonsContainer: {
        width: 220
    }
});

export default memo(CardsBlock);
