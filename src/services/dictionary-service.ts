import { AxiosResponse } from 'axios';
import HttpService from './http-service';
import { PublicDictionary } from '../types';

class DictionaryService {
    getDictionaries(token: string): Promise<PublicDictionary[]> {
        return HttpService.get<PublicDictionary[]>('/dictionaries', token)
            .then((response: AxiosResponse<PublicDictionary[]>): PublicDictionary[] => response.data);
    }
}

export default new DictionaryService();

