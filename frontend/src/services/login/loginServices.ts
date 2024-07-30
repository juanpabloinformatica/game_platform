import { axiosClient } from "../../axios/axiosClient";
async function sendLogin(username: string, password: string) {
  if (username != "" && password != "") {
    console.log("here from using axios");
    try {
      const response = await axiosClient.post(
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
