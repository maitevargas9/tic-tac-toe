export default function GameOver({ winner, isDraw, onRestart, onGoHome }) {
  return (
    <div id="game-over">
      <h2>
        {isDraw ? "Draw!" : winner ? `${winner} wins!` : ""}
      </h2>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={onRestart}>Start new game</button>
        <button onClick={onGoHome}>Homepage</button>
      </div>
    </div>
  );
}
