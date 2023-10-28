import "./App.css";
import Maze from "./Maze/Maze";
import Left from "./LeftPart/Left";

function App() {
  return (
    <div className="Container">
      <div className="App">
        <div className="Maze">
          <Maze />
        </div>
        <div className="Left">
          <Left />
        </div>
      </div>
    </div>
  );
}

export default App;
