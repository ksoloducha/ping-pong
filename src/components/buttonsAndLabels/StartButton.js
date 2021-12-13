import React, {useState, useEffect} from "react";
import './Footer.css'

const StartButton = (props) => {

    const [startButtonText, setStartButtonText] = useState("Start")
    const [gamePaused, setGamePaused] = useState(props.gamePaused)

    useEffect( () => {
        setGamePaused(props.gamePaused)
        setStartButtonText(props.gamePaused ? "Pause" : "Start")
    }, [props.gamePaused, props.gameStarted])

    const handleButtonClicked = () => {
        setGamePaused(!gamePaused)
        setStartButtonText(gamePaused ? "Pause" : "Start")
        props.changeGameStatus(!gamePaused)
    }

    return(
        <button
            className="start-button"
            onClick={handleButtonClicked}
        >{startButtonText}</button>
    );
}

export default StartButton