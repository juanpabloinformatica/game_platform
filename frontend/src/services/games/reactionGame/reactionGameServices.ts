import { axiosGameCLient } from "../../../axios/axiosClients";

async function sendCreateReactionGame(
    ballSpeed: number,
    ballNumber: number,
    playerId: number,
) {
    try {
        const response = await axiosGameCLient.post(
            "/createreactiongame",
            JSON.stringify({
                ballSpeed: ballSpeed,
                ballNumber: ballNumber,
                creatorGameId: playerId,
            }),
        );
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}
async function sendJoinReactionGame(playerId: number) {
    try {
        const response = await axiosGameCLient.post(
            "/joinreactiongame",
            JSON.stringify({
                playerId: playerId,
            }),
        );
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}
export { sendCreateReactionGame, sendJoinReactionGame };
