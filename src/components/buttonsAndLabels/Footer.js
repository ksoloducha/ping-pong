import React from 'react'
import RestartButton from './RestartButton';
import StartButton from './StartButton'
import './Footer.css'
import Score from './Score';

const Footer = (props) => {
    return (
      <div
        className='footer'
      >
        <StartButton
          gamePaused={props.gamePaused}
          gameStarted={props.gameStarted}
          changeGameStatus={props.changeGameStatus}
        />
        <Score          
          playerOneScore={props.playerOneScore}
          playerTwoScore={props.playerTwoScore}
        />
        <RestartButton 
          onRestartGame={props.onReset}
        />
      </div>
    );
  };
  
  export default Footer;
  