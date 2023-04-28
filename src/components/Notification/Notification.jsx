import React from 'react'

function Notification({ children }) {
  return (
    <div className="notification">
      { children }
    </div>
  )
}

export default Notification