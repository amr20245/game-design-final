import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createRoom, getRoom, postMove } from '../api/gameRoomApi.js';

// Winning combinations for a 3x3 tic tac toe board
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Tic Tac Toe page supporting multiplayer via a room ID. If a room isn't provided
// in the URL, a new room is created and its ID is displayed so the player can
// share it with a friend. Moves are synced using an API when available or
// localStorage fallback otherwise.
export default function TicTacToe() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomId, setRoomId] = useState(searchParams.get('room') || null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [symbol, setSymbol] = useState(null);
  const [status, setStatus] = useState('');
  const [pollIntervalId, setPollIntervalId] = useState(null);

  // Create a new room if none is provided
  useEffect(() => {
    async function init() {
      if (!roomId) {
        const id = await createRoom();
        setRoomId(id);
        setSearchParams({ room: id });
        setSymbol('X');
      } else {
        // Determine if this is the first or second player based on moves count
        const room = await getRoom(roomId);
        const moves = room.moves || [];
        const usedSymbols = moves.map((m) => m.symbol);
        if (usedSymbols.filter((s) => s === 'X').length <= usedSymbols.filter((s) => s === 'O').length) {
          setSymbol('X');
        } else {
          setSymbol('O');
        }
        setBoard(applyMovesToBoard(Array(9).fill(null), moves));
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // Poll the room for moves every second
  useEffect(() => {
    if (!roomId) return;
    const interval = setInterval(async () => {
      const room = await getRoom(roomId);
      const moves = room.moves || [];
      setBoard(applyMovesToBoard(Array(9).fill(null), moves));
    }, 1000);
    setPollIntervalId(interval);
    return () => clearInterval(interval);
  }, [roomId]);

  // Apply an array of moves to an empty board
  const applyMovesToBoard = (emptyBoard, moves) => {
    const newBoard = [...emptyBoard];
    for (const move of moves) {
      newBoard[move.index] = move.symbol;
    }
    return newBoard;
  };

  // Handle player clicking a square
  const handleClick = async (index) => {
    if (!symbol) return;
    if (board[index] || calculateWinner(board)) return;
    // Determine if it's the player's turn by counting moves
    const playerMoves = board.filter((cell) => cell !== null).length;
    const isMyTurn = (symbol === 'X' && playerMoves % 2 === 0) || (symbol === 'O' && playerMoves % 2 === 1);
    if (!isMyTurn) {
      setStatus("It's not your turn!");
      return;
    }
    // Optimistically update board
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);
    // Send move to server or localStorage
    try {
      await postMove(roomId, { index, symbol });
    } catch (err) {
      console.error(err);
    }
  };

  const winner = calculateWinner(board);
  const filled = board.every((cell) => cell !== null);

  let info;
  if (winner) {
    info = `${winner} wins!`;
  } else if (filled) {
    info = "It's a draw!";
  } else if (!symbol) {
    info = 'Loading…';
  } else {
    // Determine turn
    const playerMoves = board.filter((cell) => cell !== null).length;
    const myTurn = (symbol === 'X' && playerMoves % 2 === 0) || (symbol === 'O' && playerMoves % 2 === 1);
    info = myTurn ? "Your turn" : "Opponent's turn";
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {!searchParams.get('room') && roomId && (
        <p>
          Share this link with a friend to play online:{' '}
          <code>{window.location.origin + '/tictactoe?room=' + roomId}</code>
        </p>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '0.5rem',
          margin: '1rem 0',
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '2rem',
              cursor: cell || winner ? 'default' : 'pointer',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border)',
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <p>{info}</p>
      {status && <p style={{ color: '#b91c1c' }}>{status}</p>}
    </div>
  );
}