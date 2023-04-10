import React, { useState, useEffect } from 'react'

function Clock({onAddHover, onRemoveHover}) {
  const [hour, setHour] = useState("")
  useEffect(()=>{
    const clock = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      setHour(`${hour < 10 ? ("0"+hour) : hour}:${minutes < 10 ? ("0"+minutes) : minutes}`)
    }, 1000);

    return () => clearInterval(clock)
  }, [])

  return (
    <div className="digital-clock-container" onMouseEnter={onAddHover} onMouseLeave={onRemoveHover}>
      <div className="digital-clock">
        <span className="numbers">{hour}</span>
      </div>
      <div className="neon-clock">
        <span>{hour}</span>
      </div>
    </div>

  )
}

export default Clock