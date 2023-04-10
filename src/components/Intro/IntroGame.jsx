import React from 'react'

function IntroGame() {
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
        <div className="press-start-container">
          <img src="/images/press-start-box.png" className="press-start-box"/>  
          <img src="/images/press-start.png" className="press-start"/>  
        </div>
      </div>
    </div>
  )
}

export default IntroGame