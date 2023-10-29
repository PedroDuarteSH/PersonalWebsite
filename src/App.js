import "./App.css";
import Maze from "./Maze/Maze";
import Left from "./LeftPart/Left";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="Maze">
          <Maze />
        </div>

        <div className="information">
          <Left />
        </div>
      </div>
    </div>
  );
}

export default App;
