export default function GameOver({ winner, isDraw, onRestart, onGoHome }) {
  return (
    <div id="game-over">
      <h2>
        {winner ? `${winner} wins!` : isDraw ? "Draw!" : ""}
      </h2>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={onRestart}>Start new game</button>
        <button onClick={onGoHome}>Homepage</button>
      </div>
    </div>
  );
}
