import HttpService from './http-service';

export const wordMapper = (item) => ({
    id: item.id,
    word: item.word,
    translate: item.translate,
    progress: item.progress,
    lastUpdate: item.lastUpdate,
    isLearned: item.isLearned,
    isFavorite: item.isFavorite
});

class WordService {
    mergeWords(wordsData, token) {
        return HttpService.post('/words/merge', wordsData, token)
            .then(response => response.data)
    }

    createWord(wordsData, token) {
        return HttpService.post('/word/add', wordsData, token)
            .then(response => response.data);
    }

    updateWord(wordsData, token) {
        return HttpService.patch(`/word/update`, wordsData, token)
            .then(response => response.data);
    }

    deleteWord(id, token) {
        return HttpService.delete(`/word/delete/${id}`, token);
    }

    saveResults(words, token) {
        return HttpService.patch(`/word/save-results`, words, token);
    }

    getDictionary(token) {
        return HttpService.get(`/words`, token);
    }
}

export default new WordService();
