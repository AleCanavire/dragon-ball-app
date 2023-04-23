import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoryCard from './MemoryCard';

function Loading() {
  const navigate = useNavigate();

  const [down, setDown] = useState(false);
  const [counter, setCounter] = useState(0);
  const quantity = useRef(0);
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [loadingHidden, setLoadingHidden] = useState(true)

  function quantityPress(e) {
    if (e.key === "x") {
      quantity.current += 1
      if (quantity.current >= 5) {
        setDown(prevState => !prevState);
        quantity.current = 0;
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setTimeout(setLoadingHidden, 1000, false);
      setTimeout(setLoadingHidden, 15000, true);
      setTimeout(navigate, 16000, "/opening");
    }, 6000);

    document.addEventListener("keydown", quantityPress);
    return () => document.removeEventListener("keydown", quantityPress);
  }, []);

  useEffect(()=>{
    if (loading) {
      const interval = setInterval(() => {
        setDown(prevState => !prevState);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [loading])

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
        <div style={loadingHidden ? {opacity: "1"} : {opacity: "0"}}  className="hideLoading"/>
        </>
      : <MemoryCard/>
      }
    </>
  )
}

export default Loading