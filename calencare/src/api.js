import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const api = axios.create({
    baseURL: "https://20.206.200.61:8443/"
});

export default api;
