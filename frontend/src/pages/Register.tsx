
import CustomNavbar from "../components/Navbar";
import useRegisterState from "../hooks/pages/register/registerState";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { sendRegistration } from "../services/pages/register/registerServices";

function RegisgterForm() {
    const { username, setUsername, password, setPassword, confirmPassword, setConfirmPassword } = useRegisterState()
    const navigate = useNavigate()
    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        try {
            const response = await sendRegistration(username, password, confirmPassword);
            if (response) {
                navigate("/login")
            }
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
                    name="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label>Confirm password </label>
                <input
                    name="confirmPassword"
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <button type="submit">
                    submit
                </button>
            </form>
        </div>
    </>)
}

function RegisterPage() {
    return (<><CustomNavbar />
        <RegisgterForm />
        <Footer />
    </>
    )
}
export default RegisterPage;
