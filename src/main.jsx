import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ScreenContextProvider } from "./context/screenContext";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScreenContextProvider>
      <App />
    </ScreenContextProvider>
  </React.StrictMode>,
)
