import { useContext } from "react";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Loading from "./components/Loading/Loading";
import Opening from "./components/Opening/Opening";
import { screenContext } from "./context/screenContext";

function App() {
  const {screenActive} = useContext(screenContext);
  return (
    <div className="App">
        <main>
          { screenActive === "HomeScreen" && <HomeScreen/> }
          { screenActive === "TvScreen" && <Opening/> }
          { screenActive === "Loading" && <Loading/> }
          { screenActive === "Opening" && <Opening/> }
        </main>
    </div>
  )
}

export default App
