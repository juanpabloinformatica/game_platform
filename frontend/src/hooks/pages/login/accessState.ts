import { useState } from "react";

function useAcessState() {
    const [username, setUsername] = useState("daniel");
    const [password, setPassword] = useState("daniel");
    return { username, setUsername, password, setPassword };
}
export default useAcessState;
