import { axiosClient } from "../../axios/axiosClient";

async function sendRegistration(
  username: string,
  password: string,
  confirmPassword: string,
) {
  if (username != "" && password != "" && confirmPassword != "") {
    try {
      const response = await axiosClient.post(
        "/register",
        JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
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

export { sendRegistration };
