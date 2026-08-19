import { AxiosResponse } from 'axios';
import HttpService from './http-service';
import { DictionaryWordsResponse, PublicDictionary, RemoteDictionary } from '../types';

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
}

export default new DictionaryService();

