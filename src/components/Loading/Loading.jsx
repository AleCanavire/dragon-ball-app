import React, { useState, useEffect, useRef, useContext } from 'react';
import { screenContext } from '../../context/screenContext';
import MemoryCard from './MemoryCard';

function Loading() {
  const {changeScreen} = useContext(screenContext)

  const [down, setDown] = useState(false);
  const [counter, setCounter] = useState(0);
  const quantity = useRef(0);
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(true)

  function quantityPress(e) {
    if (e.key === "x") {
      quantity.current += 1
      if (quantity.current >= 4) {
        setDown(prevState => !prevState);
        quantity.current = 0;
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setTimeout(setShowLoading, 15000, false);
      setTimeout(changeScreen, 17000, "Opening");
    }, 6000);

    const interval = setInterval(() => {
      setDown(prevState => !prevState)
    }, 2500);
    
    document.addEventListener("keydown", quantityPress);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", quantityPress);
    }
  }, []);

  useEffect(() => {
    if (!down && !isFirstRender.current) {
      setCounter(prevCounter => prevCounter + 1);
    } else {
      isFirstRender.current = false;
    }
  }, [down]);

  return (
    <>
      { loading
      ? <>
        <div className="loading-container">
          <div className="vegeta-training-container">
            <div className="vegeta-training" style={down ? {backgroundPosition: "100%"} : {}}></div>
            <div className="counter-container">
              <img src="/images/dialog.png" alt="Cuadro de dialogo" className="box-counter" />
              <div className={`counter ${counter >= 10 ? "two-numbers" : ""}`}>
                { counter >= 10
                  ? <>
                      <img src={`/images/number-${String(counter)[0]}.png`} className="number" />
                      <img src={`/images/number-${String(counter)[1]}.png`} className="number" />
                    </>
                  : <img src={`/images/number-${counter}.png`} className="number" />
                }
              </div>
            </div>
          </div>
        </div>
        <div style={showLoading ? {opacity: "0"} : {opacity: "1"} }  className="hideLoading"/>
        </>
      : <MemoryCard/>
      }
    </>
  )
}

export default Loading