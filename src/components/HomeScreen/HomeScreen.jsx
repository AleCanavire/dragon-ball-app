import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import Clock from './Clock';
import { useEffect } from 'react';

function HomeScreen() {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [on, setOn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [zoomTv, setZoomTv] = useState(false);
  const [light, setLight] = useState(true);

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
    playedSeconds === 8 && setLight("brightness(0.1)");
    playedSeconds === 14 && setLight("brightness(0.4)");
    if (playedSeconds === 17) {
      setLight("brightness(0.1)");
      setZoomTv(true);
      setTimeout(navigate, 200, "/loading");
    }
  }
  const [mouse, setMouse] = useState({x:null, y:null})
  useEffect(()=>{
    document.addEventListener("mousemove", (e) => {
      setMouse({x:e.pageX, y:e.pageY})
    })
  }, [])
  const cursorRef = useRef();
  function addHover() {
    cursorRef.current.classList.add("hover")
  }
  function removeHover() {
    cursorRef.current.classList.remove("hover");
  }

  // Movement Room
  const [cords, setCords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMouseMove(e) {
      setCords({ x: e.clientX, y: e.clientY });
    }
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="container">
      <div className="cursor" ref={cursorRef} style={{top: mouse.y, left: mouse.x}}/>
      <div style={{transform: `scale(1.05)translate(${cords.x / -100}px, ${cords.y / -150}px)`}} className="movement-container">
        <div className="dark-room-container" style={zoomTv ? {transform: "scale(2.8)"} : {}}>
          <img src="/images/dark-room.png" style={{filter: light}}
          className="living-room" alt="Living a oscuras, donde se logran ver un sillon, una playstation 2, una tv y una silla." />
          <div className="tv-screen">
            {isVisible && <img src="/images/not-signal.webp" alt="Imagen no hay señal" className="not-signal" /> }
            <ReactPlayer
              className={"intro-ps2"}
              url="https://www.youtube.com/watch?v=YWWjTYlSp2M"
              width="100%"
              height="100%"
              playing={isPlaying}
              onProgress={changesProgress}
              />
            <div className="transition-bg" style={zoomTv ? {zIndex: 2} : {}}/>
          </div>
          <div className="playstation" onClick={lightsOn} onMouseEnter={addHover} onMouseLeave={removeHover}>
            <div className={`light ${on ? "light-on" : "light-off"}`} />
          </div>
          <Clock onAddHover={addHover} onRemoveHover={removeHover}/>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen