import { useState } from "react";

function useAcessState() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return { username, setUsername, password, setPassword };
}
export default useAcessState;
