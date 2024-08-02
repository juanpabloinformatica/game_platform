// ask why this is happening
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
// here the client, will send a request to play the game, so in this case if this is push, the modality need
// to be set to monoplayer, and the player needs to be passed to enregister his score
async function sendPlayReactionGame(
    gameConfig: any,
    playerId: number,
    gameModality: number,
) {
    try {
        const body = JSON.stringify({
            gameConfig: gameConfig,
            playerId: playerId,
            gameModality: gameModality,
        });
        const response = await axiosGameCLient.post("/reactiongameconfig", body);
        if (!response.data) {
            throw new Error("problem with response");
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { sendCreateReactionGame, sendJoinReactionGame, sendPlayReactionGame };
