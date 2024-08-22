
import { useNavigate } from "react-router-dom";
import { sendJoinReactionGame, sendPlayReactionGame } from "../services/games/reactionGame/reactionGameServices";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    useReactionGameConfigDispatch,
    useReactionGameConfigRef,
    useReactionGameConfigSelector,
    useReactionGameConfigState,
    useReactionGameToggleModalityButton
} from "../hooks/pages/reactionGameConfig/ReactionGameConfigStates";
import { initHttpUpgradeRequest, setSocketConnection } from "../games/utils";
import { setUserSocket } from "../redux/features/games/reactionGame/reactionGameSlice";
function ReactionGameConfig() {
    const { inputBallSpeed,
        setInputBallSpeed,
        inputBallNumber,
        setInputBallNumber,
        inputRoomId,
        setInputRoomId,
        gameModality,
        setGameModality,
    } = useReactionGameConfigState()
    const { onePlayer, multiPlayer } = useReactionGameConfigRef()
    const { playerId } = useReactionGameConfigSelector()
    const { dispatch } = useReactionGameConfigDispatch()
    const navigate = useNavigate()
    useReactionGameToggleModalityButton(onePlayer.current!, multiPlayer.current!, gameModality)
    const handlePlayButton = (e: React.MouseEvent) => {
        e.preventDefault()
        if (inputBallSpeed != "" && inputBallNumber != "") {
            let gameConfig: {
                ballNumber: number, ballSpeed: number,
                height: number, width: number
            } = {
                ballNumber: parseInt(inputBallNumber),
                ballSpeed: parseFloat(inputBallSpeed), width: 500, height: 500
            }
            if (typeof playerId == "number") {
                if (gameModality) {
                    let roomId = inputRoomId
                    sendPlayReactionGame(gameConfig, playerId, gameModality, roomId)
                } else {
                    sendPlayReactionGame(gameConfig, playerId, gameModality, 0)
                }
                let socketConnection = setSocketConnection(playerId)
                let socket = initHttpUpgradeRequest(socketConnection)
                dispatch(setUserSocket(socket))
                navigate("/reactiongame")
            }
        } else {
            console.log("empty fields")
        }
    }
    const handleJoinButton = (e: React.MouseEvent) => {
        e.preventDefault()
        if (inputRoomId != -1) {
            if (typeof playerId == "number") {
                sendJoinReactionGame(playerId, inputRoomId)

                let socketConnection = setSocketConnection(playerId)
                let socket = initHttpUpgradeRequest(socketConnection)
                dispatch(setUserSocket(socket))
                navigate("/reactiongame")
            }
        } else {
            console.log("empty fields")
        }
    }
    const handleOnePlayerButton = (e: React.MouseEvent) => {
        e.preventDefault()
        setGameModality(false)
    }
    const handleMultiplayerButton = (e: React.MouseEvent) => {
        e.preventDefault()
        setGameModality(true)
    }
    return (<>

        <CustomNavbar />
        <div className="wrapperCenter">
            <h1>GAME CONFIG</h1>
            <div className="gameModalityWrapper">
                <button ref={onePlayer} className="submitButton" onClick={handleOnePlayerButton}> One player </button>
                <button ref={multiPlayer} className="submitButton" onClick={handleMultiplayerButton}> Multiplayer </button>
            </div>
            {
                gameModality ?

                    <form className="form">
                        <label>Ball speed (seconds)</label>
                        <input className="" type="number" step="0.1" min="0" value={inputBallSpeed} onChange={(e) => setInputBallSpeed(e.target.value)}></input>
                        <label>Ball number</label>
                        <input className="" type="number" step="1" value={inputBallNumber} onChange={(e) => setInputBallNumber(e.target.value)} ></input>
                        <label>RoomId</label>
                        <input className="" type="text" value={inputRoomId} onChange={(e) => setInputRoomId(parseInt(e.target.value))} ></input>
                        <div className="buttonWrapper">
                            <button className="" onClick={handlePlayButton}> Create </button>
                            <button className="" onClick={handleJoinButton}> Join </button>
                        </div>
                    </form>
                    :
                    <form className="form">
                        <label>Ball speed (seconds)</label>
                        <input className="" type="number" step="0.1" min="0" value={inputBallSpeed} onChange={(e) => setInputBallSpeed(e.target.value)}></input>
                        <label>Ball number</label>
                        <input className="" type="number" step="1" value={inputBallNumber} onChange={(e) => setInputBallNumber(e.target.value)} ></input>
                        <div className="buttonWrapper">
                            <button className="" onClick={handlePlayButton}>Play</button>
                        </div>
                    </form>
            }
        </div>
        <Footer />
    </>)

}
export default ReactionGameConfig;
