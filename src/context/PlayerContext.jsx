import React, { createContext, useState, useEffect } from 'react';

// Context used to store and update the player's name across pages.
export const PlayerContext = createContext({
  name: '',
  setName: () => {},
});

export function PlayerProvider({ children }) {
  const [name, setName] = useState('');

  // Load the player name from localStorage on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('playerName');
    if (saved) setName(saved);
  }, []);

  // Save the player name to localStorage whenever it changes
  useEffect(() => {
    if (name) localStorage.setItem('playerName', name);
  }, [name]);

  return (
    <PlayerContext.Provider value={{ name, setName }}>
      {children}
    </PlayerContext.Provider>
  );
}