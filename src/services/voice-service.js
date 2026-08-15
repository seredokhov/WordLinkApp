import Tts from 'react-native-tts';

class VoiceService {
    constructor() {
        setTimeout(() => {
            this.init();
        }, 1000)
    }

    async init() {
        try {
            await Tts.setDefaultLanguage('en-GB');
            await Tts.setDefaultRate(0.5);
            await Tts.setDefaultPitch(1);
        } catch (error) {
            alert(error);
        }
    }

    async play(text) {
        try {
            await Tts.stop(true);
            Tts.speak(text);
        } catch (error) {
            alert(error);
        }
    };
}

export default new VoiceService();
