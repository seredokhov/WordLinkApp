import { AxiosResponse } from 'axios';
import HttpService from './http-service';
import {
    DictionaryProgressResponse,
    DictionaryWordsResponse,
    PublicDictionary,
    RemoteDictionary,
    SaveDictionaryProgressRequest
} from '../types';

class DictionaryService {
    getDictionaries(token: string): Promise<PublicDictionary[]> {
        return HttpService.get<PublicDictionary[]>('/dictionaries', token)
            .then((response: AxiosResponse<PublicDictionary[]>): PublicDictionary[] => response.data);
    }

    getDictionaryWords(id: string, token: string): Promise<RemoteDictionary> {
        return HttpService.get<DictionaryWordsResponse>(`/dictionaries/${id}/words`, token)
            .then((response: AxiosResponse<DictionaryWordsResponse>): RemoteDictionary => {
                return response.data.words.reduce<RemoteDictionary>((result, item) => {
                    result[item.word] = item;
                    return result;
                }, {});
            });
    }

    saveDictionaryProgress(
        userId: string,
        dictionaryId: string,
        payload: SaveDictionaryProgressRequest,
        token: string
    ): Promise<DictionaryProgressResponse> {
        return HttpService.put<DictionaryProgressResponse>(
            `/users/${userId}/dictionaries/${dictionaryId}/progress`,
            payload,
            token
        ).then((response: AxiosResponse<DictionaryProgressResponse>): DictionaryProgressResponse => response.data);
    }
}

export default new DictionaryService();
