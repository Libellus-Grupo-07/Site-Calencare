import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const api = axios.create({
//     baseURL: "http://54.243.135.89:8080/api/"
// });

const api = axios.create({
    baseURL: "http://localhost:8080/api/"
});

export default api;