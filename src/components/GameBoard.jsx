export default function GameBoard({ squares, onSelectSquare }) {
  return (
    <ol id="game-board">
      {squares.map((square, index) =>
        <li key={index}>
          <button
            onClick={() => onSelectSquare(index)}
            disabled={square !== null}
          >
            {square}
          </button>
        </li>
      )}
    </ol>
  );
}
