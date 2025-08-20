export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {winner
        ? <p>
            🏆 Player {winner} wins!
          </p>
        : <p>🤝 Draw!</p>}
      <button onClick={onRestart}>Start new game</button>
    </div>
  );
}
