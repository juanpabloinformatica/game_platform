import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

function useReactionGameConfigState() {
  const [inputBallSpeed, setInputBallSpeed] = useState("1");
  const [inputBallNumber, setInputBallNumber] = useState("10");
  const [inputJoinGame, setInputJoinGame] = useState(0);
  const [gameModality, setGameModality] = useState(false);
  return {
    inputBallSpeed,
    setInputBallSpeed,
    inputBallNumber,
    setInputBallNumber,
    inputJoinGame,
    setInputJoinGame,
    gameModality,
    setGameModality,
  };
}
function useReactionGameConfigRef() {
  const onePlayer = useRef<HTMLButtonElement>(null);
  const multiPlayer = useRef<HTMLButtonElement>(null);
  return { onePlayer, multiPlayer };
}
function useReactionGameConfigSelector() {
  const ballSpeed = useSelector<RootState>(
    (state) => state.reactionGame.ballSpeed,
  );
  const ballNumber = useSelector<RootState>(
    (state) => state.reactionGame.ballNumber,
  );
  const playerId = useSelector<RootState>((state) => state.auth.user);
  return { ballSpeed, ballNumber, playerId };
}

function useReactionGameConfigDispatch() {
  const dispatch = useDispatch<AppDispatch>();
  return { dispatch };
}

function useReactionGameToggleModalityButton(
  onePlayer: HTMLButtonElement,
  multiPlayer: HTMLButtonElement,
  gameModality: any,
) {
  useEffect(() => {
    function toggleModalityButton() {
      if (onePlayer && multiPlayer) {
        if (!gameModality) {
          multiPlayer.style.backgroundColor = "gray";
          multiPlayer.style.color = "black";
          onePlayer.style.backgroundColor = "black";
          onePlayer.style.color = "white";
        } else {
          onePlayer.style.backgroundColor = "gray";
          onePlayer.style.color = "black";
          multiPlayer.style.backgroundColor = "black";
          multiPlayer.style.color = "white";
        }
      }
    }
    toggleModalityButton();
  }, [gameModality]);
}

export {
  useReactionGameConfigState,
  useReactionGameConfigRef,
  useReactionGameConfigSelector,
  useReactionGameConfigDispatch,
  useReactionGameToggleModalityButton,
};
