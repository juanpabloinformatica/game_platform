import { NavLink } from "react-router-dom";
import "../styles/styles.css"


function CustomNavbar() {
    return (<>
        <div className="navbarWrapper">
            <NavLink className="navLink" to="/">Home</NavLink>
            <NavLink className="navLink" to="/login">Login</NavLink>
            <NavLink className="navLink" to="/register">Register</NavLink>
        </div>

    </>)
}
export default CustomNavbar;

