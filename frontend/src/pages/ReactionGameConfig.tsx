import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBallNumber, updateBallSpeed } from "../redux/features/games/reactionGame/reactionGameSlice";
import { useNavigate } from "react-router-dom";
import { sendToGameServer } from "../services/games/reactionGame/reactionGameServices";

function ReactionGameConfig() {
    // const [ballSpeed, setBallSpeed] = useState(null)
    const [inputBallSpeed, setInputBallSpeed] = useState("1")
    const [inputBallNumber, setInputBallNumber] = useState("10")
    const ballSpeed = useSelector(state => state.reactionGame.ballSpeed)
    const ballNumber = useSelector(state => state.reactionGame.ballNumber)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleButton = (e) => {
        e.preventDefault()
        if (inputBallSpeed != "" && inputBallNumber != "") {
            dispatch(updateBallSpeed(parseFloat(inputBallSpeed)))
            dispatch(updateBallNumber(parseInt(inputBallNumber)))
            sendToGameServer(parseFloat(inputBallSpeed), parseInt(inputBallNumber))
            navigate("/reactiongame")
        } else {
            console.log("empty fields")
        }
    }
    return (<>
        <div className="">
            <h1>GAME CONFIG</h1>
            <form className="">
                <label>Ball speed (seconds)</label>
                <input className="" type="number" step="0.1" min="0" value={inputBallSpeed} onChange={(e) => setInputBallSpeed(e.target.value)}></input>
                <label>Ball number</label>
                <input className="" type="number" step="1" value={inputBallNumber} onChange={(e) => setInputBallNumber(e.target.value)} ></input>
                <button className="" onClick={handleButton}> Play </button>
            </form>
        </div>
    </>)

}
export default ReactionGameConfig;
