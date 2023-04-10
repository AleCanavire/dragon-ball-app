import React, { useEffect, useState } from 'react'
import IntroGame from './IntroGame';

function Intro() {
  const [showIntroGame, setShowIntroGame] = useState(false);
  const [introHidden, setIntroHidden] = useState(true);

  useEffect(()=>{
    const soundtrack = new Audio("./media/soundtrack.mp3");
    setTimeout(setIntroHidden, 0, false);
    setTimeout(() => {
      soundtrack.play()
    }, 1000);
    setTimeout(setIntroHidden, 5000, true);
    setTimeout(setShowIntroGame, 6000, true);
  }, [])
  return (
    <div className="intro-container">
      { showIntroGame
      ? <IntroGame/>
      : <div className="rights-reserved">
          <p className="rights-text">© 2007 Atari, Inc. All rights reserved.</p>
          <div className="rights-text">
            {`© 2007 BIRD STUDIO/SHUEISHA, TOEI ANIMATION. Licensed by FUNimation
            Productions, Ltd. All Rights Reserved. Dragon Ball, Dragon Ball Z, Dragon Ball GT,
            and all logos, character names and distinctive likenesses thereof are trademarks of TOEI
            ANIMATION. Developed by Alexander Canavire Inc. GAME: © 2007
            NAMCO BANDAI Games Inc. Marketed and distributed by Atari, Inc., New York, NY.
            Atari and the Atari logo are trademarks owned by Atari Interactive, Inc. All other
            trademarks are the property of their respective owners. "PlayStation" and the "PS"
            Family logo are registered trademarks of Sony Computer Entertainment Inc. The ESRB
            rating icons are registered trademarks of the Entertainment Software Association.`}
          </div>
          <div style={introHidden ? {opacity: "1"} : {opacity: "0"}} className="hide-text"/>
        </div>
      }
    </div>
  )
}

export default Intro