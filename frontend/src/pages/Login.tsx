import CustomNavbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { sendLogin } from '../services/login/loginServices';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/features/auth/authSlice';
import useAcessState from '../hooks/pages/login/accessState';
import Footer from '../components/Footer';

function LoginForm() {
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch()
    const { username, setUsername, password, setPassword } = useAcessState()
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        try {
            const response = await sendLogin(username, password)
            console.log("before dispatch")
            console.log(isAuth)
            if (response.accessToken) {
                dispatch(isAuthenticated(true))
                navigate("/userhome")
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <div className="loginWrapper">
            <form onSubmit={handleSubmit} className="form">
                <label>Username</label>
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Password</label>
                <input
                    name="username"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">
                    submit
                </button>
            </form>
        </div>

    </>)
}
function LoginPage() {
    return (<>
        <CustomNavbar />
        <LoginForm />
        <Footer/>
    </>)
}
export default LoginPage;
