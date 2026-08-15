import axios from 'axios';

const instance = axios.create({
    baseURL: 'url/api',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;
