import React, { useEffect } from 'react'

function MemoryCard() {
  useEffect(()=>{
    const boxSound = new Audio("./media/box-sound.mp3");
    boxSound.play();
  }, [])

  return (
    <div className="memory-card-container">
      <div className="memory-card">
        <img src="./images/recuadro-bt3.webp"/>
        <div className="memory-text">
          <h2>MEMORY CARD slot 1</h2>
          <p>
          Checking memory card (PS2)...<br/>
          Do not remove memory card (PS2),<br/>
          controller, reset, or switch off the console.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemoryCard