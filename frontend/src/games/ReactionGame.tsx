import { useEffect } from "react";
import "../styles/styles.css"
import { init } from "../ts/games/reaction_game_socket";
import CustomNavbar from "../components/Navbar";

function ReactionGame() {
    useEffect(() => {
        init()
    })
    return (<>
        <CustomNavbar />
        <div className="wrapper">
            <canvas id="myCanvas"></canvas>
            <button className="gameButton"> Play </button>
            <div className="result"></div>
        </div>
    </>)
}

export default ReactionGame;
