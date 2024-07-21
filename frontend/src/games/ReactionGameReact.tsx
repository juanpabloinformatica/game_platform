import { useEffect, useRef, useState } from "react";
import "../styles/styles.css"
import CustomNavbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { init, initHttpUpgradeRequest, setCanvas, setSocketConnection } from "../ts/games/reaction_game_socket_react";

function ReactionGame() {
    let canvasRef = useRef(null);
    let buttonRef = useRef(null);
    let resultRef = useRef(null);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        let canvas = canvasRef.current;
        setCanvas(canvas!)
        let socketConnection = setSocketConnection()
        let socket = initHttpUpgradeRequest(socketConnection)
        setWebsocket(socket)
        console.log(buttonRef.current)
        console.log(websocket)
        init(buttonRef.current!, websocket!)
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
