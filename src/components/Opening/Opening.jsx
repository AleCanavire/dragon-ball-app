import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';

function Opening() {
  const [reduceShadow, setReduceShadow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function changesProgress(e) {
    const playedSeconds = Math.trunc(e.playedSeconds);
    playedSeconds === 1 && setIsLoading(false);
    playedSeconds === 5 && setReduceShadow(true);
  }

  const navigate = useNavigate()
  useEffect(() => {
    function skipOpening() {
      navigate("/intro")
    }
    document.addEventListener("keydown", skipOpening)
    return () => document.removeEventListener("keydown", skipOpening)
  }, [])
  
  return (
    <div className="opening-container">
      <ReactPlayer
        className={"opening-bt3"}
        url="https://www.youtube.com/watch?v=AH1B2loppaI"
        width="100%"
        height="100%"
        playing={true}
        onProgress={changesProgress}
        onEnded={() => navigate("/intro")}
      />
      <div className={`screenShadow ${isLoading ? "" : "showOpening" }`}
      style={ reduceShadow ? {boxShadow: "inset 0 0 100px 30px #000"} : {boxShadow: "inset 0 0 150px 150px #000"}}
      />
      <Notification>
        <p>Press any button to skip the intro.</p>
      </Notification>
    </div>
  )
}

export default Opening