async function sendLogin(username: string, password: string) {
    if (username != "" && password != "") {
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username: username, password: password }),
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
}

export { sendLogin };
