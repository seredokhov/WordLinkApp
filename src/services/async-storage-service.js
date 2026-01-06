import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
    async getDictionary() {
        const words = await AsyncStorage.getItem('words');

        return JSON.parse(words);
    }

    async setDictionary(data) {
        let words;
        if (typeof data === 'string') {
            words = data;
        } else {
            words = JSON.stringify(data);
        }

        await AsyncStorage.setItem('words', words);
    }

    async getUser() {
        const userData = await AsyncStorage.getItem('user');

        return JSON.parse(userData);
    }

    async setUser(user) {
        const userData = JSON.stringify(user);
        await AsyncStorage.setItem('user', userData);
    }

    async removeUser() {
        await  AsyncStorage.removeItem('user');
    }

    async saveWord(wordData) {
        const wordJSON = JSON.stringify({
            [wordData.word]: wordData
        });

        return AsyncStorage.mergeItem('words', wordJSON);
    }

    async mergeWordsData(wordsData) {
        const { created, updated } = wordsData;

        const dictionary = await AsyncStorage.getItem('words');
        const parsedDictionary = JSON.parse(dictionary);

        created.forEach(entity => {
            parsedDictionary[entity.word] = {
                ...entity
            };
        });

        updated.forEach(data => {
            const { oldWordName, newWordData } = data;

            delete parsedDictionary[oldWordName];
            parsedDictionary[newWordData.word] = newWordData;
        })

        await AsyncStorage.setItem('words', JSON.stringify(parsedDictionary));
    };

    async updateWord(wordData) {
        const { oldWordName, newWordData } = wordData;
        const words = await AsyncStorage.getItem('words');
        const parsedWords = JSON.parse(words);

        delete parsedWords[oldWordName];

        parsedWords[newWordData.word] = newWordData;

        await AsyncStorage.setItem('words', JSON.stringify(parsedWords));
    }

    async deleteWord(word) {
        const words = await AsyncStorage.getItem('words');
        const parsedWords = JSON.parse(words);

        delete parsedWords[word];
        await AsyncStorage.setItem('words', JSON.stringify(parsedWords));
    }

    async deleteAllData() {
        await AsyncStorage.clear();
    }
}

export default new AsyncStorageService();
