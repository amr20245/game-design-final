import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Hub from './pages/Hub.jsx';
import RockPaperScissors from './pages/RockPaperScissors.jsx';
import TicTacToe from './pages/TicTacToe.jsx';
import Wordle from './pages/Wordle.jsx';
import MemoryCards from './pages/MemoryCards.jsx';

// Central routing configuration for the GameHub SPA.
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/memory-cards" element={<MemoryCards />} />
        <Route path="*" element={<div style={{ padding: '2rem' }}>Page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;