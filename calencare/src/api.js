import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const api = axios.create({
    baseURL: "3.216.72.5:5225"
});

export default api;
