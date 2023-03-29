import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false)
  const [on, setOn] = useState(false);
  const [isVisible, setIsVisible] = useState(true)
  const [zoom, setZoom] = useState(false);
  const [zoomTv, setZoomTv] = useState(false);

  function lightsOn() {
    if (!on) {
      setTimeout(()=> {
        setOn(true)
        setIsPlaying(true)
      }, 500)
    }
  }

  function changesProgress(e) {
    const playedSeconds = Math.trunc(e.playedSeconds);
    playedSeconds === 3 && setIsVisible(false);
    if (playedSeconds === 17) {
      setZoomTv(true);
      setTimeout(navigate, 1500, "/loading");
    }
  }

  return (
    <div className="container">
      <div className="ps2-and-tv" style={zoom ? {transform: "scale(1.8)"} : {}} onMouseEnter={()=>setZoom(true)}>
        <div className="tv2000s" style={zoomTv ? {transform: "scale(3)"} : {}}>
          <img src="/images/tv2000s-screen.png" alt="Tele modelo de los 2000s" className='tv2000s-image' />
          {isVisible && <img src="/images/not-signal.webp" alt="Imagen no hay señal" className='not-signal' /> }
          <ReactPlayer
            className={"intro-ps2"}
            url="https://www.youtube.com/watch?v=YWWjTYlSp2M"
            width="80%"
            height="84%"
            playing={isPlaying}
            onProgress={changesProgress}
          />
          <div className="transition-bg" style={zoomTv ? {zIndex: 2} : {}}/>
        </div>
        <div className="playstation-2">
          <img src="/images/Playstation-2-slim.png" alt="Foto de una Playstation 2 de frente" className="playstation-image" />
          <div className="button-on" onClick={lightsOn}/>
          <div className={`light ${on ? "light-on" : "light-off"}`} />
        </div>  
      </div>
    </div>
  )
}

export default HomeScreen