import { useEffect, useRef, useState } from "react";
import "../styles/styles.css"
import CustomNavbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { init, setCanvas } from "../ts/games/reaction_game_socket_react";
import { initHttpUpgradeRequest, setSocketConnection } from "../ts/utils";
import { useSelector } from "react-redux";

function ReactionGame() {
    const ballSpeed = useSelector(state => state.reactionGame.ballSpeed)
    const ballNumber = useSelector(state => state.reactionGame.ballNumber)
    let canvasRef = useRef(null);
    let buttonRef = useRef(null);
    let resultRef = useRef(null);
    const [websocket, setWebsocket] = useState(null)
    useEffect(() => {
        console.log(ballSpeed)
        console.log(ballNumber)
        let canvas = canvasRef.current;
        setCanvas(canvas!)
        let socketConnection = setSocketConnection()
        let socket = initHttpUpgradeRequest(socketConnection)
// passing here the new values
        init(canvasRef.current!, buttonRef.current!, socket!, resultRef.current!)
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
