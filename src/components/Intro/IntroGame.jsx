import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function IntroGame({ onPause }) {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(false)
  const [start, setStart] = useState(false);
  const [active, setActive] = useState(1);
  const endIntro = useRef(false);

  const number = Math.floor(Math.random() * 6) + 1;
  const voice = new Audio(`./media/voice-${number}.mp3`);
  const dialog = new Audio(`./media/dialog-${number}.mp3`);

  const select = new Audio("./media/select-sound.mp3");
  const selected = new Audio("./media/selected-sound.mp3");

  useEffect(()=>{
    setTimeout(setShowIntro, 0, true);
    setTimeout(() => {
      endIntro.current = true;
      voice.play();
    }, 6000);
  },[])
  function handlePause() {
    onPause();
  }

  useEffect(() => {
    function pressKey(e) {
      if (e.key === "Enter" && start === false && endIntro.current === true) {
        selected.play();
        dialog.play();
        setStart(true);
      } else if (e.key === "Enter" && start === true && endIntro.current === true) {
        selected.play();
        handlePause();
        setShowIntro(false);
        setTimeout(navigate, 300, "/versusmenu");
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setActive(1);
      } else if (e.key === "ArrowDown" || e.key === "s") {
        setActive(2);
      }
    }

    document.addEventListener("keydown", pressKey);
    return () => document.removeEventListener("keydown", pressKey);
  }, [start])

  useEffect(()=>{
    if (start === true) {
      select.play();
    }
  }, [active])
  
  return (
    <div className="intro-game">
      <div className="background">
        <img src="/images/nubes-2.png" alt="nubes" className="clouds clouds-two"/>
        <img src="/images/nubes.png" alt="nubes" className="clouds clouds-one"/>
      </div>
      <div className="characters-container">
        <div className="characters">
          <img src="/images/piccolo_bt3.png" className="picoro"/>
          <img src="/images/vegeta_bt3.png" className="vegeta"/>
          <img src="/images/trunks_bt3.png" className="trunks"/>
          <img src="/images/gohan_adult_bt3.png" className="gohan"/>
          <img src="/images/goten_bt3.png" className="goten"/>
          <img src="/images/goku_bt3.png" className="goku"/>
          <img src="/images/logo.png" className="logo-budokai"/>  
          <img src="/images/esfera.png" className="esfera"/>  
        </div>
      </div>
      <div className="menu">
        { start === false && 
          <div className="press-start-container">
            <img src="/images/press-start-box.png" className="press-start-box"/>  
            <img src="/images/press-start.png" className="press-start"/>  
          </div>
        }
        <div className="select-game-container">
          <div className={`new-game ${start ? "active" : ""}`}>
            <div className="bar" style={active === 1 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
            <div className="text" style={active === 1 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
          </div>
          <div className={`continue-game ${start ? "active" : ""}`}>
            <div className="bar" style={active === 2 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
            <div className="text" style={active === 2 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
          </div>
        </div>
      </div>
      <div style={showIntro ? {opacity: "0"} : {opacity: "1"}} className="hide-intro" />
    </div>
  )
}

export default IntroGame