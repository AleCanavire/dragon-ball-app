import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function Opening() {
  const [reduceShadow, setReduceShadow] = useState(false);
  useEffect(() => {
    setTimeout(setReduceShadow, 5000, true);
  }, [])
  
  return (
    <div className="opening-container">
      <ReactPlayer
        className={"opening-bt3"}
        url="https://www.youtube.com/watch?v=AH1B2loppaI"
        width="100%"
        height="100%"
        playing={true}
      />
      <div className="screenShadow"
      style={ reduceShadow
      ? {boxShadow: "inset 0 0 100px 30px #000"}
      : {boxShadow: "inset 0 0 150px 150px #000"}}/>
    </div>
  )
}

export default Opening