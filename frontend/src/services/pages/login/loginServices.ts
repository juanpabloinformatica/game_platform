import axios from "axios";
import { axiosAuthClient } from "../../../axios/axiosClients";

async function sendLogin(username: string, password: string) {
    if (username != "" && password != "") {
        console.log("here from using axios");
        console.log(axiosAuthClient.getUri());
        try {
            const response = await axiosAuthClient.post(
                "/login",
                JSON.stringify({ username: username, password: password }),
            );
            if (!response.data) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
export { sendLogin };
