import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Intro from './components/Intro/Intro';
import Loading from "./components/Loading/Loading";
import Opening from "./components/Opening/Opening";
import VersusMenu from './components/VersusMenu/VersusMenu';
import Characters from './components/Characters/Characters';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route exact path="/" element={<HomeScreen/>} />
            <Route exact path="/loading" element={<Loading/>} />
            <Route exact path="/opening" element={<Opening/>} />
            <Route exact path="/intro" element={<Intro/>} />
            <Route exact path="/versusmenu" element={<VersusMenu/>} />
            <Route exact path="/characters" element={<Characters/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
