import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import "./App.css";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSelectSquare(index) {
    if (squares[index]) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = activePlayer;
    setSquares(updatedSquares);

    setActivePlayer(prev => (prev === "X" ? "O" : "X"));
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setActivePlayer("X");
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        <GameBoard squares={squares} onSelectSquare={handleSelectSquare} />

        <button onClick={handleRestart}>New Game</button>
      </div>
    </main>
  );
}

export default App;
