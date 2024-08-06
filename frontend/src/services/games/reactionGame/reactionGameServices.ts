// ask why this is happening
import { axiosGameCLient } from "../../../axios/axiosClients";

async function sendJoinReactionGame(playerId: number, roomId: number) {
    try {
        const response = await axiosGameCLient.post(
            "/joinreactiongame",
            JSON.stringify({
                playerId: playerId,
                roomId: roomId,
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
    gameModality: boolean,
    roomId: number,
) {
    try {
        const body = JSON.stringify({
            gameConfig: gameConfig,
            playerId: playerId,
            gameModality: gameModality,
            roomId: roomId,
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

export { sendJoinReactionGame, sendPlayReactionGame };
