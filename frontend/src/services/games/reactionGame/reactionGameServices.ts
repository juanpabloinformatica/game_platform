const temp_endpoint = "http://localhost:7777/reactiongameconfig";
async function sendToGameServer(ballSpeed: number, ballNumber: number) {
    try {
        const response = await fetch(temp_endpoint, {
            method: "POST",
// ask why this is happening
            headers: {
                // Accept: "application/json",
                // "Content-Type": "application/json",
            },
            body: JSON.stringify({ ballSpeed: ballSpeed, ballNumber: ballNumber }),
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

export { sendToGameServer };
