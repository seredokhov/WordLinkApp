import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dictionary, MergeWordsResponse, User, Word, WordUpdateResult } from '../types';

class AsyncStorageService {
    private async readDictionary(): Promise<Dictionary> {
        const raw: string | null = await AsyncStorage.getItem('words');
        if (!raw) {
            return {};
        }
        return JSON.parse(raw) as Dictionary;
    }

    async getDictionary(): Promise<Dictionary> {
        return this.readDictionary();
    }

    async setDictionary(data: Dictionary): Promise<void> {
        const words: string = JSON.stringify(data);
        await AsyncStorage.setItem('words', words);
    }

    async getUser(): Promise<User | null> {
        const userData: string | null = await AsyncStorage.getItem('user');

        if (!userData) {
            return null;
        }

        return JSON.parse(userData) as User;
    }

    async setUser(user: User): Promise<void> {
        const userData: string = JSON.stringify(user);
        await AsyncStorage.setItem('user', userData);
    }

    // async removeUser() {
    //     await  AsyncStorage.removeItem('user');
    // }

    async saveWord(wordData: Word): Promise<void> {
        const wordJSON: string = JSON.stringify({
            [wordData.word]: wordData
        });

        return AsyncStorage.mergeItem('words', wordJSON);
    }

    async mergeWordsData(wordsData: MergeWordsResponse): Promise<void> {
        const { created, updated } = wordsData;
        const dictionary: Dictionary = await this.readDictionary();

        created.forEach((entity: Word): void => {
            dictionary[entity.word] = {
                ...entity
            };
        });

        updated.forEach((data: WordUpdateResult): void => {
            const { oldWordName, newWordData } = data;

            delete dictionary[oldWordName];
            dictionary[newWordData.word] = newWordData;
        })

        await this.setDictionary(dictionary);
    }

    async updateWord(wordData: WordUpdateResult): Promise<void> {
        const { oldWordName, newWordData } = wordData;
        const dictionary: Dictionary = await this.readDictionary();

        delete dictionary[oldWordName];
        dictionary[newWordData.word] = newWordData;
        await this.setDictionary(dictionary);
    }

    async deleteWord(word: string): Promise<void> {
        const dictionary: Dictionary = await this.readDictionary();

        delete dictionary[word];
        await this.setDictionary(dictionary);
    }

    async deleteAllData(): Promise<void> {
        await AsyncStorage.clear();
    }
}

export default new AsyncStorageService();
