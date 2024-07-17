import { Form, Button, Container } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { sendLogin } from '../services/login/loginServices';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/features/auth/authSlice';

function LoginForm() {
    const navigate = useNavigate()
    const isAuth = useSelector((state) => {
        console.log(state.auth.isAuth)
        return state.auth.isAuth
    })
    // useEffect(() => { console.log(`testing change ${isAuth}`) }, [isAuth])
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async (event: Event) => {

        event.preventDefault();
        try {
            // console.log("here")
            const response = await sendLogin(username, password)
            console.log("before dispatch")
            console.log(isAuth)
            if (response.accessToken) {
                dispatch(isAuthenticated(true))
                navigate("/games")
            }
            console.log(response)
        } catch (error) {
            console.log(error)
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
    return (<>
        <CustomNavbar />
        <LoginForm />
    </>)
}
export default LoginPage;
