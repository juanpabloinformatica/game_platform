import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { handleToken } from "../services/protectedRoutes/protectedRouteServices";
import { useIdle } from "@uidotdev/usehooks";

function ProtectedRoute() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user)
    const idle = useIdle(3600 * 1000)
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuth)
    // useEffect(() => {
    //     dispatch()
    // }, [idle])
    useEffect(() => {

        async function handler() {
            console.log(userId)
            console.log(userId)
            if (await handleToken(true, userId) == false) {
                console.log("not authorized")
                navigate("/notAuthorized")
            }
        }
        handler()
    })
    return (<Outlet />)
}
export default ProtectedRoute;
