import "./styles.css";
import Game from "./components/game/Game";
import React, {useRef, useState} from "react";

const App = () => {
  const[time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [playerOneScore, setPlayerOneScore] = useState(0)
  const [playerTwoScore, setPlayerTwoScore] = useState(0)

  let countRef = useRef(null);

  const handleGameStatusChange = (newIsPaused) => {
    setIsPaused(newIsPaused)
    if(newIsPaused){
      countRef.current = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else{
      clearInterval(countRef.current)
    }
  }

  const handleResetGame = () => {
    setTime(0)
    handleGameStatusChange(false)
    setPlayerOneScore(0)
    setPlayerTwoScore(0)
  }

  const addPointForPlayerOne = () => {
    setPlayerOneScore((playerOneScore) => playerOneScore + 1)
  }

  const addPointForPlayerTwo = () => {
    setPlayerTwoScore((playerTwoScore) => playerTwoScore + 1)
  }

  return(
    <Game
      time={time}
      gamePaused={isPaused}
      changeGameStatus={handleGameStatusChange}
      onReset={handleResetGame}
      playerOneScore={playerOneScore}
      playerTwoScore={playerTwoScore}
      addPointForPlayerOne={addPointForPlayerOne}
      addPointForPlayerTwo={addPointForPlayerTwo}
    />
  );
}

export default App