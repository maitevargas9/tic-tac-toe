export default function Player({
  name,
  symbol,
  isActive,
  isEditing,
  onNameChange,
  onEditClick
}) {
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing
          ? <input
              type="text"
              value={name}
              onChange={event => onNameChange(symbol, event.target.value)}
            />
          : <span className="player-name">
              {name}
            </span>}
        <span className="player-symbol">
          {symbol}
        </span>
      </span>

      <button onClick={() => onEditClick(symbol)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
