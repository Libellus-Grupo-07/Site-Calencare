import axios from "axios";

const api = axios.create({
    baseURL: "https://20.206.200.61:8443/"
});

export default api;
