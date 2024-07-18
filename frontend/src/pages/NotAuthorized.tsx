import Footer from "../components/Footer";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"
function NotAuthorized() {
    return (<>
        <CustomNavbar/>
        <div className="notAuthorized">
            NOT AUTHORIZED
        </div >
        <Footer/>
    </>)

}
export default NotAuthorized;
