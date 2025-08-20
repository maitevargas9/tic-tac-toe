import { useState } from "react";

export default function GameBoard() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(index) {
    if (squares[index]) return;

    const updatedSquares = [...squares];
    updatedSquares[index] = activePlayer;
    setSquares(updatedSquares);

    setActivePlayer(prev => (prev === "X" ? "O" : "X"));
  }

  return (
    <ol id="gameBoard">
      {squares.map((square, index) =>
        <li key={index}>
          <button
            onClick={() => handleSelectSquare(index)}
            disabled={square !== null}
          >
            {square}
          </button>
        </li>
      )}
    </ol>
  );
}
