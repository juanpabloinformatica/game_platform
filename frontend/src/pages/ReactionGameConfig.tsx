import { updateBallNumber, updateBallSpeed } from "../redux/features/games/reactionGame/reactionGameSlice";
import { useNavigate } from "react-router-dom";
import { sendCreateReactionGame, sendJoinReactionGame } from "../services/games/reactionGame/reactionGameServices";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setModality } from "../redux/features/games/gamesSlice";
import {
    useReactionGameConfigDispatch,
    useReactionGameConfigRef,
    useReactionGameConfigSelector,
    useReactionGameConfigState,
    useReactionGameToggleModalityButton
} from "../hooks/pages/reactionGameConfig/ReactionGameConfigStates";
function ReactionGameConfig() {
    const { inputBallSpeed,
        setInputBallSpeed,
        inputBallNumber,
        setInputBallNumber,
        inputJoinGame,
        setInputJoinGame,
        gameModality,
        setGameModality,
    } = useReactionGameConfigState()
    const { onePlayer, multiPlayer } = useReactionGameConfigRef()
    const { playerId } = useReactionGameConfigSelector()
    const { dispatch } = useReactionGameConfigDispatch()
    const navigate = useNavigate()
    useReactionGameToggleModalityButton(onePlayer.current!, multiPlayer.current!, gameModality)
    const handleCreateButton = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(setModality(gameModality))
        if (inputBallSpeed != "" && inputBallNumber != "") {
            dispatch(updateBallSpeed(parseFloat(inputBallSpeed)))
            dispatch(updateBallNumber(parseInt(inputBallNumber)))
            sendCreateReactionGame(parseFloat(inputBallSpeed), parseInt(inputBallNumber), playerId)
            navigate("/reactiongame")
        } else {
            console.log("empty fields")
        }
    }
    const handleJoinButton = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(setModality(gameModality))
        if (inputJoinGame != -1) {
            sendJoinReactionGame(playerId)
            navigate("/reactiongame")
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
                        <label>Join Game Id</label>
                        <input className="" type="text" value={inputJoinGame} onChange={(e) => setInputJoinGame(parseInt(e.target.value))} ></input>
                        <div className="buttonWrapper">
                            <button className="" onClick={handleCreateButton}> Create </button>
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
                            <button className="" onClick={handleCreateButton}> Join </button>
                        </div>
                    </form>
            }
        </div>
        <Footer />
    </>)

}
export default ReactionGameConfig;
