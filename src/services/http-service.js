import axios from "../../axios";

const setAuthToken = token => {
    if (!token) {
        return null;
    }

    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
}

class HttpService {
    post(url, body, token = null) {
        return axios.post(url, body, setAuthToken(token));
    }

    get(url, token = null) {
        return axios.get(url, setAuthToken(token));
    }

    delete(url, token = null) {
        return axios.delete(url, setAuthToken(token));
    }

    patch(url, body, token = null) {
        return axios.patch(url, body, setAuthToken(token));
    }
}

export default new HttpService();
