import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext.jsx';

// PlayerBanner displays the current player's name. If the name is not set, it
// instructs the user to return to the hub and set it.
export default function PlayerBanner() {
  const { name } = useContext(PlayerContext);
  return (
    <div>
      {name ? (
        <span>Player: {name}</span>
      ) : (
        <span style={{ fontStyle: 'italic', color: '#6b7280' }}>
          Set your name on the hub
        </span>
      )}
    </div>
  );
}