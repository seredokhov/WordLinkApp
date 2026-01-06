import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://192.168.0.149:3000', // local
     baseURL: 'http://192.168.0.149/api', // docker
//    baseURL: 'http://85.209.90.167:4000', // remote
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;
