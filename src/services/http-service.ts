import axios from '../../axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const setAuthToken: (token: string | null) => AxiosRequestConfig | undefined = token  => {
    if (!token) {
        return undefined;
    }

    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
};

class HttpService {
    post<T = unknown>(url: string, body: unknown, token: string | null = null): Promise<AxiosResponse<T>> {
        return axios.post<T>(url, body, setAuthToken(token));
    }

    get<T = unknown>(url: string, token: string | null = null): Promise<AxiosResponse<T>> {
        return axios.get<T>(url, setAuthToken(token));
    }

    delete<T = unknown>(url: string, token: string | null = null): Promise<AxiosResponse<T>> {
        return axios.delete<T>(url, setAuthToken(token));
    }

    patch<T = unknown>(url: string, body: unknown, token: string | null = null): Promise<AxiosResponse<T>> {
        return axios.patch<T>(url, body, setAuthToken(token));
    }
}

export default new HttpService();
