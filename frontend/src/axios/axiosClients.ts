import axios from "axios";
const axiosAuthClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
const axiosGameCLient = axios.create({
    baseURL: "http://localhost:7777",
    // withCredentials: true,
});
export { axiosAuthClient, axiosGameCLient };
