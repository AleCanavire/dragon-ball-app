import { useState, useEffect, useRef } from 'react';

function IntroGame() {
  const [start, setStart] = useState(false);
  const [active, setActive] = useState({option1: true, option2: false});
  const endIntro = useRef(false);

  const select = new Audio("./media/select-sound.mp3");
  useEffect(() => {
    setTimeout(() => {
      endIntro.current = true;
    }, 6000);
    function pressKey(e) {
      if (e.key === "Enter" && start === false && endIntro.current === true) {
        select.play();
        setStart(true);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setActive({option1: true, option2: false});
      } else if (e.key === "ArrowDown" || e.key === "s") {
        setActive({option1: false, option2: true});
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
            <div className="bar" style={active.option1 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
            <div className="text" style={active.option1 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
          </div>
          <div className={`continue-game ${start ? "active" : ""}`}>
            <div className="bar" style={active.option2 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
            <div className="text" style={active.option2 ? {backgroundPositionY: "0"} : {backgroundPositionY: "7.1vh"}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroGame