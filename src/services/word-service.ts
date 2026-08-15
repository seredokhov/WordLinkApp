import HttpService from './http-service';
import { CreateWordRequest, Dictionary, MergeWordsRequest, MergeWordsResponse, Word } from '../types';
import { AxiosResponse } from 'axios';

export const wordMapper = (item: Word): Word => ({
    id: item.id,
    word: item.word,
    translate: item.translate,
    progress: item.progress,
    lastUpdate: item.lastUpdate,
    isLearned: item.isLearned,
    isFavorite: item.isFavorite
});

class WordService {
    mergeWords(wordsData: MergeWordsRequest, token: string): Promise<MergeWordsResponse> {
        return HttpService.post<MergeWordsResponse>('/words/merge', wordsData, token)
            .then((response: AxiosResponse<MergeWordsResponse>): MergeWordsResponse => response.data)
    }

    createWord(wordsData: CreateWordRequest, token: string): Promise<Word> {
        return HttpService.post<Word>('/word/add', wordsData, token)
            .then((response: AxiosResponse<Word>): Word => response.data);
    }

    updateWord(wordsData: Word, token: string): Promise<Word> {
        return HttpService.patch<Word>(`/word/update`, wordsData, token)
            .then((response: AxiosResponse<Word>): Word => response.data);
    }

    deleteWord(id: string, token: string): Promise<AxiosResponse<void>> {
        return HttpService.delete<void>(`/word/delete/${id}`, token);
    }

    saveResults(words: Dictionary, token: string): Promise<AxiosResponse<void>> {
        return HttpService.patch<void>(`/word/save-results`, words, token);
    }

    getDictionary(token: string): Promise<Dictionary> {
        return HttpService.get<Dictionary>(`/words`, token)
            .then((response: AxiosResponse<Dictionary>): Dictionary => response.data);
    }
}

export default new WordService();
