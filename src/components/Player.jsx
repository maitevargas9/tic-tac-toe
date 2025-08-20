import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
    setIsEditing(prev => !prev);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing
          ? <input type="text" value={playerName} onChange={handleChange} />
          : <span className="player-name">
              {playerName}
            </span>}
        <span className="player-symbol">
          {symbol}
        </span>
      </span>

      <button onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
