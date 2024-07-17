
import CustomNavbar from "../components/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function RegisgterForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        if (username != "" && password != "" && confirmPassword != "") {
            try {
                const response = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password, confirmPassword: confirmPassword })
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.error(error.message);
            }
        }
    }
    return (
        <Form action="http://localhost:3000/register" method="POST" className="p-4 rounded shadow-sm bg-light">
            <h2 className="mb-4 text-center">Register</h2>
            <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="p-2"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="p-2"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="p-2"
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
                Submit
            </Button>
        </Form>
    );
}
function RegisterPage() {
    return (<><CustomNavbar />
        <RegisgterForm /></>
    )
}
export default RegisterPage;
