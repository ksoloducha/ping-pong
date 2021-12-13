import React, {useState, useEffect} from "react";
import "./Footer.css";

const Score = (props) => {

  const [playerOneScore, setPlayerOneScore] = useState(props.playerOneScore)
  const [playerTwoScore, setPlayerTwoScore] = useState(props.playerTwoScore)

  useEffect( () => {
    setPlayerOneScore(props.playerOneScore)
    setPlayerTwoScore(props.playerTwoScore)
  }, [props.playerOneScore, props.playerTwoScore])

  const displayScore = () => {
    return (<p>{playerOneScore} : {playerTwoScore}</p>)
  }

  return (
  <div 
    className="score"
  >
      {displayScore()}
  </div>
  );
};

export default Score;
