import { useState, useEffect, useCallback } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import winLines from "./utils/winLines.js";
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
  const [isSinglePlayer, setIsSinglePlayer] = useState(null);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("ticTacToeStats");
    return saved ? JSON.parse(saved) : { X: 0, O: 0, draw: 0 };
  });

  useEffect(
    () => {
      localStorage.setItem("ticTacToeStats", JSON.stringify(stats));
    },
    [stats]
  );

  const checkWinner = useCallback(board => {
    for (const [a, b, c] of winLines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const handleSelectSquare = useCallback(
    index => {
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

      const winCheck = checkWinner(updatedSquares);
      if (winCheck) {
        setWinner(winCheck);
        setStats(prev => ({
          ...prev,
          [winCheck]: prev[winCheck] + 1
        }));
        return;
      }

      if (updatedSquares.every(Boolean)) {
        setStats(prev => ({
          ...prev,
          draw: prev.draw + 1
        }));
        return;
      }

      setActivePlayer(prev => (prev === "X" ? "O" : "X"));
    },
    [squares, activePlayer, winner, playerNames, checkWinner]
  );

  useEffect(
    () => {
      if (isSinglePlayer && activePlayer === "O" && !winner) {
        const freeSquares = squares
          .map((val, i) => (val === null ? i : null))
          .filter(v => v !== null);

        if (freeSquares.length > 0) {
          const randomIndex =
            freeSquares[Math.floor(Math.random() * freeSquares.length)];
          const timer = setTimeout(() => handleSelectSquare(randomIndex), 500);
          return () => clearTimeout(timer);
        }
      }
    },
    [activePlayer, isSinglePlayer, squares, winner, handleSelectSquare]
  );

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

  if (isSinglePlayer === null) {
    return (
      <main style={{ textAlign: "center", marginTop: "3rem" }}>
        <h2>Select game mode</h2>
        <button
          onClick={() => {
            setIsSinglePlayer(true);
            setPlayerNames({ X: "Player 1", O: "Computer" });
          }}
        >
          1 Player
        </button>
        <button
          onClick={() => {
            setIsSinglePlayer(false);
            setPlayerNames({ X: "Player 1", O: "Player 2" });
          }}
        >
          2 Player
        </button>
      </main>
    );
  }

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

        <GameOver
          winner={winner ? playerNames[winner] : null}
          isDraw={isDraw}
          onRestart={handleRestart}
          onGoHome={() => {
            handleRestart();
            setIsSinglePlayer(null);
            setStats({ X: 0, O: 0, draw: 0 });
            localStorage.removeItem("ticTacToeStats");
          }}
        />

        <Log turns={turns} />

        <div id="stats" style={{ marginTop: "2rem", textAlign: "center" }}>
          <h3>Statistics</h3>
          <p>
            {playerNames.X} Victories: {stats.X}
          </p>
          <p>
            {playerNames.O} Victories: {stats.O}
          </p>
          <p>
            Draw: {stats.draw}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
