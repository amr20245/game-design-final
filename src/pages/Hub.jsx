import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext.jsx';
import GameCard from '../components/GameCard.jsx';

// Hub page displays all games and allows the player to set their name.
export default function Hub() {
  const { name, setName } = useContext(PlayerContext);
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    }
  };

  return (
    <div>
      <section style={{ marginBottom: '1.5rem' }}>
        <h1>Welcome to GameHub!</h1>
        <p>Enter your player name so your scores and achievements can be saved.</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Player name"
            style={{ padding: '0.5rem', flex: '1 1 auto' }}
          />
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </section>
      <section>
        <h2>Games</h2>
        <div className="grid">
          <GameCard
            title="Rock Paper Scissors"
            description="Battle the computer in the timeless RPS duel."
            route="/rock-paper-scissors"
          />
          <GameCard
            title="Tic Tac Toe"
            description="Challenge a friend or play the AI in classic tic tac toe."
            route="/tictactoe"
          />
          <GameCard
            title="Wordle"
            description="Guess the secret five-letter word in six tries."
            route="/wordle"
          />
          <GameCard
            title="Memory Cards"
            description="Match pairs of cards in as few flips as possible."
            route="/memory-cards"
          />
        </div>
      </section>
    </div>
  );
}