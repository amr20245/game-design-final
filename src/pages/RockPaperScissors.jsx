import React, { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'];

function getResult(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  const play = (choice) => {
    const cpu = choices[Math.floor(Math.random() * choices.length)];
    const res = getResult(choice, cpu);
    setPlayerChoice(choice);
    setComputerChoice(cpu);
    setResult(res);
    setScore((prev) => {
      const update = { ...prev };
      if (res === 'win') update.wins += 1;
      if (res === 'lose') update.losses += 1;
      if (res === 'tie') update.ties += 1;
      return update;
    });
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, ties: 0 });
  };

  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <p>Choose your hand and face off against the computer!</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {choices.map((c) => (
          <button key={c} className="btn" onClick={() => play(c)}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      {result && (
        <div style={{ marginBottom: '1rem' }}>
          <p>
            You chose <strong>{playerChoice}</strong>. The computer chose{' '}
            <strong>{computerChoice}</strong>.
          </p>
          <p>
            {result === 'win' && 'You win!'}
            {result === 'lose' && 'You lose!'}
            {result === 'tie' && "It's a tie!"}
          </p>
        </div>
      )}
      <h3>Score</h3>
      <p>
        Wins: {score.wins} | Losses: {score.losses} | Ties: {score.ties}
      </p>
      <button className="btn" onClick={reset} style={{ marginTop: '0.5rem' }}>
        Reset
      </button>
    </div>
  );
}