import CustomNavbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { isAuthenticated, setUser } from '../redux/features/auth/authSlice';
import useAcessState from '../hooks/pages/login/accessState';
import Footer from '../components/Footer';
import { AppDispatch } from '../redux/store';
import { sendLogin } from '../services/pages/login/loginServices';
import { JwtPayload } from '../types';
import { jwtDecode } from 'jwt-decode';

function LoginForm() {
    const navigate = useNavigate()
    // const isAuth = useSelector<RootState>((state) => state.auth.isAuth)
    const dispatch = useDispatch<AppDispatch>()
    const { username, setUsername, password, setPassword } = useAcessState()
    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            const response = await sendLogin(username, password)
            if (response.accessToken) {
                dispatch(isAuthenticated(true))
                let decoded = jwtDecode<JwtPayload>(response.accessToken)
                dispatch(setUser(decoded.userId))
                navigate("/userhome")
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <div className="wrapperCenter">
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
        <Footer />
    </>)
}
export default LoginPage;


