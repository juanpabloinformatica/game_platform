import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBallNumber, updateBallSpeed } from "../redux/features/games/reactionGame/reactionGameSlice";
import { useNavigate } from "react-router-dom";
import { sendCreateReactionGame, sendJoinReactionGame } from "../services/games/reactionGame/reactionGameServices";
// import CustomNavbar from "../components/Navbar";
// import Footer from "../components/Footer";

function ReactionGameConfig() {
    // const [ballSpeed, setBallSpeed] = useState(null)
    const [inputBallSpeed, setInputBallSpeed] = useState("1")
    const [inputBallNumber, setInputBallNumber] = useState("10")
    const [inputJoinGame, setInputJoinGame] = useState(0)
    const ballSpeed = useSelector(state => state.reactionGame.ballSpeed)
    const ballNumber = useSelector(state => state.reactionGame.ballNumber)
    const playerId = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCreateButton = (e) => {
        e.preventDefault()
        if (inputBallSpeed != "" && inputBallNumber != "") {
            dispatch(updateBallSpeed(parseFloat(inputBallSpeed)))
            dispatch(updateBallNumber(parseInt(inputBallNumber)))
            sendCreateReactionGame(parseFloat(inputBallSpeed), parseInt(inputBallNumber), playerId)
            navigate("/reactiongame")
        } else {
            console.log("empty fields")
        }
    }
    const handleJoinButton = (e) => {
        e.preventDefault()
        if (inputJoinGame != -1) {
            sendJoinReactionGame(playerId)
            navigate("/reactiongame")
        } else {
            console.log("empty fields")
        }
    }
    return (<>

        <CustomNavbar />
        <div className="wrapperCenter">
            <h1>GAME CONFIG</h1>
            <form className="form">
                <label>Ball speed (seconds)</label>
                <input className="" type="number" step="0.1" min="0" value={inputBallSpeed} onChange={(e) => setInputBallSpeed(e.target.value)}></input>
                <label>Ball number</label>
                <input className="" type="number" step="1" value={inputBallNumber} onChange={(e) => setInputBallNumber(e.target.value)} ></input>
                <label>Join Game Id</label>
                <input className="" type="text" value={inputJoinGame} onChange={(e) => setInputJoinGame(e.target.value)} ></input>
                <div className="buttonWrapper">
                    <button className="" onClick={handleCreateButton}> Create </button>
                    <button className="" onClick={handleJoinButton}> Join </button>
                </div>
            </form>
        </div>
        <Footer />
    </>)

}
export default ReactionGameConfig;
