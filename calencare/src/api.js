import axios from "axios";

const api = axios.create({
    baseURL: "http://20.206.200.61:8080/"
});

export default api;