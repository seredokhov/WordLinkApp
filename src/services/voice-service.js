import Tts from 'react-native-tts';

class VoiceService {
    constructor() {
        Promise
            .all([
                Tts.setDefaultLanguage('en-GB'),
                // Tts.setDefaultVoice('en-GB-language'),
                Tts.setDefaultRate(0.5),
                Tts.setDefaultPitch(1)
            ])
            .catch(alert);
    }

    play(text) {
        Tts.stop(true);
        Tts.speak(text);
    };
}

export default new VoiceService();
