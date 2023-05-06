import React from 'react';
import InfoIcon from "../../assets/images/info-icon.svg";

function Notification({ children }) {
  return (
    <div className="notification">
      <img className="info-icon" src={InfoIcon} />
      { children }
    </div>
  )
}

export default Notification