import { axiosGameCLient } from "../../../axios/axiosClients";

async function getUserChartData(
  playerId: number,
  ballSpeed: number,
  ballNumber: number,
) {
  try {
    const response = await axiosGameCLient.get(
      `/userchart?playerId=${playerId}&ballSpeed=${ballSpeed}&ballNumber=${ballNumber}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
export { getUserChartData };
