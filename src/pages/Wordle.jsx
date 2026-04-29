import React, { useState, useEffect } from 'react';

// Basic list of five-letter words. In a real project you might fetch a larger list
// or include a dictionary. Here we define a small set for demonstration.
const WORDS = [
  'react',
  'audio',
  'about',
  'stone',
  'other',
  'candy',
  'pilot',
  'laugh',
  'smart',
  'crane',
];

function pickRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

// Compute feedback array for a guess compared to the target word. Returns an array
// of values: 'correct', 'present', or 'absent'.
function getFeedback(guess, target) {
  const feedback = Array(guess.length).fill('absent');
  const targetLetters = target.split('');
  // First pass: mark exact matches
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = 'correct';
      targetLetters[i] = null;
    }
  }
  // Second pass: mark present letters
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === 'correct') continue;
    const idx = targetLetters.indexOf(guess[i]);
    if (idx > -1) {
      feedback[i] = 'present';
      targetLetters[idx] = null;
    }
  }
  return feedback;
}

export default function Wordle() {
  const [target, setTarget] = useState(pickRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const maxGuesses = 6;

  // Reset the game by picking a new word and clearing guesses
  const reset = () => {
    setTarget(pickRandomWord());
    setGuesses([]);
    setInput('');
    setMessage('');
  };

  const handleSubmit = () => {
    const guess = input.toLowerCase();
    if (guess.length !== 5) {
      setMessage('Your guess must be five letters.');
      return;
    }
    if (!WORDS.includes(guess)) {
      setMessage('That word is not in the list.');
      return;
    }
    const feedback = getFeedback(guess, target);
    const newGuess = { word: guess, feedback };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setInput('');
    if (guess === target) {
      setMessage('Congratulations! You guessed the word.');
    } else if (newGuesses.length >= maxGuesses) {
      setMessage(`Better luck next time! The word was "${target}".`);
    } else {
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <h1>Wordle</h1>
      <p>Guess the hidden five-letter word in six tries.</p>
      <div style={{ marginBottom: '1rem' }}>
        {guesses.map((g, rowIndex) => (
          <div
            key={rowIndex}
            style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}
          >
            {g.word.split('').map((letter, i) => (
              <span
                key={i}
                style={{
                  width: '2rem',
                  height: '2rem',
                  lineHeight: '2rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  backgroundColor:
                    g.feedback[i] === 'correct'
                      ? '#16a34a'
                      : g.feedback[i] === 'present'
                      ? '#d97706'
                      : '#6b7280',
                  color: '#fff',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {guesses.length < maxGuesses && !message.startsWith('Congratulations') && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5))}
            onKeyDown={handleKeyPress}
            placeholder="Enter a 5-letter word"
            style={{ padding: '0.5rem', textTransform: 'uppercase' }}
          />
          <button className="btn" onClick={handleSubmit} style={{ marginLeft: '0.5rem' }}>
            Guess
          </button>
        </div>
      )}
      {message && <p>{message}</p>}
      {(message.startsWith('Congratulations') || message.startsWith('Better')) && (
        <button className="btn" onClick={reset}>
          New Game
        </button>
      )}
    </div>
  );
}