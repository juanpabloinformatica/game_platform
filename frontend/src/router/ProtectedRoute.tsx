import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuth)
    useEffect(() => {
        if (isAuth == false) {
            navigate("/notAuthorized")
        }
    })
    return (<Outlet />)
}
export default ProtectedRoute;
