import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import "./App.css";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player />
          <Player />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
