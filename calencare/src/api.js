import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const api = axios.create({
    baseURL: "http://calencare.zapto.org/api/"
});

export default api;