import { Link } from "react-router-dom";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"

function GamesPage() {
    return (<>
        <CustomNavbar />
        <div className="gamesPageWrapper">
            <Link to="/reactiongame">ReactionGame</Link>
        </div>
    </>)
}


export default GamesPage;
