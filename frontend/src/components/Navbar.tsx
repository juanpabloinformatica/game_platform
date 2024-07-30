import { NavLink, useNavigate } from "react-router-dom";
import "../styles/styles.css"
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../redux/features/auth/authSlice";
import { AppDispatch, RootState } from "../redux/store";

function CustomNavbar(): React.ReactElement {
    const isAuth = useSelector<RootState>(state => state.auth.isAuth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(isAuthenticated(false))
        navigate("/")
    }
    return (<> {!isAuth ?
        <div className="navbarWrapper">
            <NavLink className="navLink" to="/">Home</NavLink>
            <NavLink className="navLink" to="/login">Login</NavLink>
            <NavLink className="navLink" to="/register">Register</NavLink>
        </div>
        :
        <div className="navbarWrapper">
            <NavLink className="navLink" to="/userhome">Home</NavLink>
            <NavLink className="navLink" to="/games">Games</NavLink>
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    }

    </>)
}
export default CustomNavbar;

