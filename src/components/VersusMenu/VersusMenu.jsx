import { useState, useEffect } from 'react';

function VersusMenu() {
  const [active, setActive] = useState(1);
  const [soundtrack] = useState(new Audio("./media/versus-soundtrack.mp3"));
  const [playerCom] = useState(new Audio("./media/1P-vs-COM.mp3"));
  const [playerPlayer] = useState(new Audio("./media/1P-vs-2P.mp3"));
  const [comCom] = useState(new Audio("./media/COM-vs-COM.mp3"));
  const [settings] = useState(new Audio("./media/Battle-Settings.mp3"));

  const select = new Audio("./media/select-sound.mp3");
  const selected = new Audio("./media/selected-sound.mp3");
  
  useEffect(() => {
    function playVoice(opt, prevOpt, newOpt) {
      setActive(opt);
      prevOpt.pause();
      prevOpt.currentTime = 0;
      newOpt.play();
    }
    function pressKey(e) {
      if (e.key === "ArrowUp" || e.key === "w") {
        active === 4 && playVoice(3, settings, comCom);
        active === 3 && playVoice(2, comCom, playerPlayer);
        active === 2 && playVoice(1, playerPlayer, playerCom);
      } else if (e.key === "ArrowDown" || e.key === "s") {
        active === 1 && playVoice(2, playerCom, playerPlayer);
        active === 2 && playVoice(3, playerPlayer, comCom);
        active === 3 && playVoice(4, comCom, settings);
      } else if (e.key === "Enter") {
        selected.play();
      }
    }
    document.addEventListener("keydown", pressKey);
    return () => document.removeEventListener("keydown", pressKey);
  }, [active])

  useEffect(()=>{
    select.play();
  }, [active])

  const [blink, setBlink] = useState(false)
  useEffect(()=>{
    soundtrack.play();
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(setBlink, 600, false);
    }, 4000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="versus-menu-container">
      <div className="background">
        <img src="/images/versus-background.png" className="bg" />
        <img src="/images/nubes-versus.png" className="clouds" />
        <img src="/images/clouds-bg-left.png" className="clouds-bg-left" />
        <img src="/images/clouds-bg-right.png" className="clouds-bg-right" />
      </div>
      <div className="vegeta-and-nappa">
        <div style={blink ? {animation: "blink .3s steps(2, end) .3s"} : {}} className="nappa"/>
        <div style={blink ? {animation: "blink .3s steps(2, end)"} : {}} className="vegeta"/>
      </div>
      <div className="menu">
        <div className="menu-header">
          <img src="/images/versus-title.png" className="versus-title" />
          <img src="/images/versus-logo.png" className="versus-logo" />
        </div>
        <div className="menu-options">
          <div className={`option-1 option ${active === 1 ? "selected" : ""}`}>
            <div className="player-vs-com option-text"/>
            <div className="scouter-digits"/>
            <img src="/images/scouter.png" className="scouter" />
          </div>
          <div className={`option-2 option ${active === 2 ? "selected" : ""}`}>
            <div className="player-vs-player option-text"/>
            <div className="scouter-digits"/>
            <img src="/images/scouter.png" className="scouter" />
          </div>
          <div className={`option-3 option ${active === 3 ? "selected" : ""}`}>
            <div className="com-vs-com option-text"/>
            <div className="scouter-digits"/>
            <img src="/images/scouter.png" className="scouter" />
          </div>
          <div className={`option-4 option ${active === 4 ? "selected" : ""}`}>
            <div className="battle-settings option-text"/>
            <div className="scouter-digits"/>
            <img src="/images/scouter.png" className="scouter" />
          </div>
        </div>
        <div className="subtitle-container">
          <div className="subtitle-box">
            <img src="/images/versus-box.png" className="versus-box"/>
            <p className="subtitle">{subtitle[active]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VersusMenu;

const subtitle = {
  1: "Fight against the computer.",
  2: "Fight against another player!",
  3: "Watch the computer fight.",
  4: "Nappa! Prepare for battle!"
}