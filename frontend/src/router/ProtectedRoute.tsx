import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
// import Cookies from "js-cookie"
// import { handleToken } from "../services/protectedRoutes/protectedRouteServices";

function ProtectedRoute() {
    // const userId = useSelector<RootState>(state => state.auth.user)
    const navigate = useNavigate()
    const isAuth = useSelector<RootState>((state) => state.auth.isAuth)
    useEffect(() => {
        if (isAuth == false) {
            navigate("/notAuthorized")
        }
    })
    return (<Outlet />)
}
export default ProtectedRoute;
