const create_endpoint = "http://localhost:7777/createreactiongame";
let join_endpoint = "http://localhost:7777/joinreactiongame";
// ask why this is happening
async function sendCreateReactionGame(
    ballSpeed: number,
    ballNumber: number,
    playerId: number,
) {
    try {
        const response = await fetch(create_endpoint, {
            method: "POST",
            // ask why this is happening
            headers: {
                // Accept: "application/json",
                // "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ballSpeed: ballSpeed,
                ballNumber: ballNumber,
                creatorGameId: playerId,
            }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(`${error}`);
    }
}
async function sendJoinReactionGame(playerId: number, roomId: string) {
    try {
        const response = await fetch(join_endpoint, {
            method: "POST",
            // ask why this is happening
            headers: {
                // Accept: "application/json",
                // "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerId: playerId,
                roomId: roomId,
            }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(`${error}`);
    }
}
export { sendCreateReactionGame, sendJoinReactionGame };
