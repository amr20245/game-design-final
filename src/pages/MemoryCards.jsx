import React, { useState, useEffect } from 'react';

// Generate a shuffled deck of card objects. Each pair shares the same value.
function generateDeck() {
  const values = ['🍎', '🍌', '🍇', '🍒', '🍍', '🥝'];
  const cards = [];
  values.forEach((val) => {
    cards.push({ id: `${val}-1`, value: val, isFlipped: false, isMatched: false });
    cards.push({ id: `${val}-2`, value: val, isFlipped: false, isMatched: false });
  });
  return shuffle(cards);
}

function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function MemoryCards() {
  const [deck, setDeck] = useState(generateDeck);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // Reset the board to a new shuffled deck
  const resetGame = () => {
    setDeck(generateDeck());
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setMoves(0);
  };

  // Handle card selection
  const handleChoice = (card) => {
    if (disabled || card.isFlipped || card.isMatched) return;
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
      setDisabled(true);
    }
  };

  // Compare cards when both choices are selected
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setMoves((m) => m + 1);
      if (choiceOne.value === choiceTwo.value) {
        // Mark matched cards
        setDeck((prevDeck) =>
          prevDeck.map((card) => {
            if (card.value === choiceOne.value) {
              return { ...card, isMatched: true };
            }
            return card;
          }),
        );
        resetTurn();
      } else {
        // Flip back after a short delay
        setTimeout(() => {
          resetTurn();
        }, 800);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Determine if all cards are matched
  const allMatched = deck.every((card) => card.isMatched);

  return (
    <div>
      <h1>Memory Cards</h1>
      <p>Flip two cards at a time to find all matching pairs.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 80px)',
          gap: '0.5rem',
          margin: '1rem 0',
        }}
      >
        {deck.map((card) => {
          const isFlipped =
            card.isFlipped || card.isMatched || card.id === choiceOne?.id || card.id === choiceTwo?.id;
          return (
            <div
              key={card.id}
              onClick={() => handleChoice(card)}
              style={{
                width: '80px',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isFlipped ? '#fbbf24' : 'var(--card-bg)',
                border: '1px solid var(--border)',
                fontSize: '2rem',
                cursor: isFlipped ? 'default' : 'pointer',
                borderRadius: '0.25rem',
              }}
            >
              {isFlipped ? card.value : ''}
            </div>
          );
        })}
      </div>
      <p>Moves: {moves}</p>
      {allMatched && <p>Congratulations! You matched all the cards.</p>}
      <button className="btn" onClick={resetGame}>
        {allMatched ? 'Play Again' : 'Reset'}
      </button>
    </div>
  );
}