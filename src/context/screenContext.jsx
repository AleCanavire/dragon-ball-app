import React, { createContext, useState } from 'react'

export const screenContext = createContext();

export function ScreenContextProvider(props) {

  const [screenActive, setScreenActive] = useState("HomeScreen");
  
  function changeScreen(screen) {
    setScreenActive(screen)
  }

  return (
    <screenContext.Provider value={{screenActive, changeScreen}}>
      {props.children}
    </screenContext.Provider>
  )
}