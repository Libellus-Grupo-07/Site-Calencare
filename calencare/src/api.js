import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const api = axios.create({
    baseURL: "http://10.0.0.199:8080"
});

export default api;
