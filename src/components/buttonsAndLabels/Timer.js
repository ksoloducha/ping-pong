import React, {useState, useEffect} from "react";
import "./Timer.css";

const Timer = (props) => {

  const [time, setTime] = useState(props.time)

  useEffect( () => {
    setTime(props.time);
  }, [props.time]); 

  const displayTime = () => {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    return (<p>Time: {minutes} m {seconds} s</p>)
  }

  return (
  <div 
    className="timer"
  >
      {displayTime()}
  </div>
  );
};

export default Timer;
