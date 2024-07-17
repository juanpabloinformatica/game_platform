import { Form, Button, Container } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        if (username != "" && password != "") {
            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, password: password })
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
        <Container onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center vh-100">
            <Form action="http://localhost:3000/login" method="POST" className="p-4 rounded shadow-sm bg-light w-50">
                <h2 className="mb-4 text-center text-primary">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
function LoginPage() {
    return (<><CustomNavbar /><LoginForm /></>)
}
export default LoginPage;
