import Tts from 'react-native-tts';
import { Alert } from 'react-native';

class VoiceService {
    constructor() {
        setTimeout((): void => {
            this.init();
        }, 1000);
    }

    async init(): Promise<void> {
        try {
            await Tts.setDefaultLanguage('en-GB');
            await Tts.setDefaultRate(0.5);
            await Tts.setDefaultPitch(1);
        } catch (error) {
            Alert.alert('Error', String(error));
        }
    }

    async play(text: string): Promise<void> {
        try {
            await Tts.stop(true);
            Tts.speak(text);
        } catch (error) {
            Alert.alert('Error', String(error));
        }
    };
}

export default new VoiceService();
