import Board from "./Board";
import Timer from "../buttonsAndLabels/Timer";
import Footer from '../buttonsAndLabels/Footer'
import "./Game.css";

function Game(props) {
  return (
    <div className="board">
      <Timer 
        time={props.time}
      />
      <Board 
        gamePaused={props.gamePaused}
        addPointForPlayerOne={props.addPointForPlayerOne}
        addPointForPlayerTwo={props.addPointForPlayerTwo}
      />
      <Footer 
        gamePaused={props.gamePaused}
        changeGameStatus={props.changeGameStatus}
        onReset={props.onReset}
        playerOneScore={props.playerOneScore}
        playerTwoScore={props.playerTwoScore}
      />
    </div>
  );
}

export default Game;
