import React, { memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import CardFlip from 'react-native-card-flip';
import { COLORS } from '../../constants/theme';
import VoiceService from '../../services/voice-service';
import Card from './';
import IconButton from '../button/icon-button';
import CardBackDictionaryBadge from './card-back-dictionary-badge';

const FlipCard = props => {
    const {
        word,
        translate,
        dictionaryTitle
    } = props;

    const cardRed = useRef(null);

    const listen = useCallback(() => {
        VoiceService.play(word);
        cardRed.current && cardRed.current.tip();
    }, [word]);

    const flipCard = useCallback(() => {
        cardRed.current && cardRed.current.flip();
    }, []);

    return (
        <CardFlip
            style={styles.cardContainer}
            ref={cardRed}
        >
            <View style={styles.cardWrapper}>
                <Card title={word}>
                    <View style={styles.cardControls}>
                        <IconButton
                            text="Listen"
                            icon="volume-high-outline"
                            onPress={listen}
                        />
                        <IconButton
                            text="Flip"
                            icon="arrow-undo-outline"
                            onPress={flipCard}
                        />
                    </View>
                </Card>
                {
                    dictionaryTitle && (
                        <CardBackDictionaryBadge title={dictionaryTitle} />
                    )
                }
            </View>
            <Card
                title={translate}
                backgroundColor={COLORS.lightGray}
                textColor={COLORS.lighterBlack}
            >
                <IconButton
                    text="Flip"
                    icon="arrow-undo-outline"
                    color={COLORS.white}
                    backgroundColor={COLORS.lightRed}
                    underlayColor={COLORS.darkerRed}
                    onPress={flipCard}
                />
            </Card>
        </CardFlip>
    );
};

FlipCard.propTypes = {
    word: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    dictionaryTitle: PropTypes.string
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 340,
        height: 500,
    },
    cardControls: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 150
    },
    cardWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        elevation: 20
    },
});

export default memo(FlipCard);
