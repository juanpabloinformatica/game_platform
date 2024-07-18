import { Link } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"
import Footer from "../components/Footer";

function GamesPage() {
    return (<>
        <CustomNavbar />
        <div className="gamesPageWrapper">
            <Link to="/reactiongame">ReactionGame</Link>
        </div>
        <Footer/>
    </>)
}


export default GamesPage;
