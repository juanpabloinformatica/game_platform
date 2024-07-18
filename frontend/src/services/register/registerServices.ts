async function sendRegistration(
    username: string,
    password: string,
    confirmPassword: string,
) {
    if (username != "" && password != "" && confirmPassword != "") {
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
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
}

export { sendRegistration };
