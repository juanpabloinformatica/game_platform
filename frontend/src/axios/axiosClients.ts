import axios from "axios";
import {
  AXIOS_AUTH_CLIENT_BASE_URL,
  AXIOS_AUTH_CLIENT_BASE_URL_DOCKER,
  AXIOS_GAME_CLIENT_BASE_URL,
  AXIOS_GAME_CLIENT_BASE_URL_DOCKER,
  DOCKER,
} from "../variables";
console.log("===========here docker============")
console.log(DOCKER)
console.log(AXIOS_AUTH_CLIENT_BASE_URL)
console.log("===========end docker============")
const axiosAuthClient = axios.create({
  baseURL: DOCKER
    ? AXIOS_AUTH_CLIENT_BASE_URL_DOCKER
    : AXIOS_AUTH_CLIENT_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
const axiosGameCLient = axios.create({
  baseURL: DOCKER
    ? AXIOS_GAME_CLIENT_BASE_URL_DOCKER
    : AXIOS_GAME_CLIENT_BASE_URL,
  // withCredentials: true,
});
export { axiosAuthClient, axiosGameCLient };
