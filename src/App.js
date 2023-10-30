import "./App.css";
import Maze from "./Maze/Maze";
import Information from "./Information/Information";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="Maze" id="Maze">
          <Maze />
        </div>

        <div className="information">
          <Information />
        </div>
      </div>
    </div>
  );
}

export default App;
