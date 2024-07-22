import { NavLink } from "react-router-dom";
import "../styles/styles.css"
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { useState } from "react";


function CustomNavbar() {
    // const [user, setUser] = useState("guess")
    const isAuth = useSelector(state => state.auth.isAuth)
    // const dispatch = useDispatch()
    // const handleNavbar() => {
    //     if (isAuth == true){
    //         setUser("user")
    //     }
    // }
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
        </div>
    }

    </>)
}
export default CustomNavbar;

