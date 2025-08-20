import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import "./App.css";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2"
  });
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [turns, setTurns] = useState([]);

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleSelectSquare(index) {
    if (squares[index] || winner) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = activePlayer;
    setSquares(updatedSquares);

    setTurns(prev => [
      { square: index, player: playerNames[activePlayer] },
      ...prev
    ]);

    for (const [a, b, c] of winLines) {
      if (
        updatedSquares[a] &&
        updatedSquares[a] === updatedSquares[b] &&
        updatedSquares[a] === updatedSquares[c]
      ) {
        setWinner(updatedSquares[a]);
        return;
      }
    }

    setActivePlayer(prev => (prev === "X" ? "O" : "X"));
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setActivePlayer("X");
    setWinner(null);
    setTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayerNames(prev => ({ ...prev, [symbol]: newName }));
  }

  function handleEditClick(symbol) {
    setEditingPlayer(prev => (prev === symbol ? null : symbol));
  }

  const isDraw = !winner && squares.every(Boolean);

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            name={playerNames.X}
            symbol="X"
            isActive={activePlayer === "X"}
            isEditing={editingPlayer === "X"}
            onNameChange={handleNameChange}
            onEditClick={handleEditClick}
          />
          <Player
            name={playerNames.O}
            symbol="O"
            isActive={activePlayer === "O"}
            isEditing={editingPlayer === "O"}
            onNameChange={handleNameChange}
            onEditClick={handleEditClick}
          />
        </ol>

        <GameBoard squares={squares} onSelectSquare={handleSelectSquare} />

        {(winner || isDraw) &&
          <GameOver
            winner={winner ? playerNames[winner] : null}
            onRestart={handleRestart}
          />}

        <Log turns={turns} />
      </div>
    </main>
  );
}

export default App;
