import { Link } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"
import Footer from "../components/Footer";

function GamesPage() {
    return (<>
        <CustomNavbar />
        <div className="gamesPageWrapper">
            <Link to="/reactiongameconfig">ReactionGame</Link>
        </div>
        <Footer />
    </>)
}
export default GamesPage;
