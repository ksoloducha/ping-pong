import React from 'react'
import './Footer.css'

const RestartButton = (props) => {

    return(
        <button
            className='restart-button'
            onClick={props.onRestartGame}
        >
            Restart
        </button>
    )
}

export default RestartButton