import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'url/api',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;
