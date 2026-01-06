import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import CardFlip from 'react-native-card-flip';
import { COLORS } from '../../constants/theme';
import VoiceService from '../../services/voice-service';
import Card from './';
import IconButton from '../button/icon-button';

const FlipCard = props => {
    const {
        word,
        translate
    } = props;

    const cardRed = useRef(null);

    const listen = () => {
        VoiceService.play(word);
        cardRed.current.tip();
    };

    const flipCard = () => {
        cardRed.current.flip();
    };

    return (
        <CardFlip
            style={styles.cardContainer}
            ref={cardRed}
        >
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
    )
};

FlipCard.propTypes = {
    word: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired
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
    }
});

export default FlipCard;
