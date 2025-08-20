export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, index) =>
        <li key={index}>
          {turn.player} has chosen field {turn.square + 1}
        </li>
      )}
    </ol>
  );
}
