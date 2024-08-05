import "../../styles/styles.css"
import { useEffect, useRef } from "react";
import CustomNavbar from "../../components/Navbar";
import { init, setCanvas } from "./logic/reaction_game_socket_react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function ReactionGame() {

    // const modality = useSelector<RootState>(state => state.games.modality)
    let canvasRef = useRef(null);
    let buttonRef = useRef(null);
    let resultRef = useRef(null);
    const playerId = useSelector<RootState>(state => state.auth.user)
    const playerSocket = useSelector<RootState>(state => state.reactionGame.userSocket)
    useEffect(() => {
        let canvas = canvasRef.current;
        setCanvas(canvas!)
        // console.log(playerSocket)
        init(playerSocket, canvasRef.current!, buttonRef.current!, resultRef.current!)
    }, [])
    return (<>
        <CustomNavbar />
        <div className="wrapper">
            <canvas id="myCanvas" ref={canvasRef}></canvas>
            <button className="gameButton" ref={buttonRef} > Play </button>
            <div className="result" ref={resultRef}></div>
        </div>
    </>)
}

export default ReactionGame;
