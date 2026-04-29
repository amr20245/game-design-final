// Simple game room API adapter used by the Tic Tac Toe multiplayer page.
// It attempts to call an external service if available via the
// VITE_CLASS_API_URL environment variable. If the environment variable is
// undefined, or if the network call fails, it falls back to using
// localStorage to synchronize moves between multiple tabs in the browser.

const API_URL = import.meta.env.VITE_CLASS_API_URL;

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function createRoom() {
  if (API_URL) {
    try {
      const data = await fetchJson(`${API_URL}/rooms`, {
        method: 'POST',
      });
      return data.id;
    } catch (err) {
      console.warn('Falling back to localStorage rooms:', err);
    }
  }
  // Fallback: generate a random ID and store an empty game in localStorage
  const id = Math.random().toString(36).slice(2, 10);
  localStorage.setItem(`room:${id}`, JSON.stringify({ moves: [] }));
  return id;
}

export async function getRoom(roomId) {
  if (API_URL) {
    try {
      return await fetchJson(`${API_URL}/rooms/${roomId}`);
    } catch (err) {
      console.warn('Falling back to localStorage rooms:', err);
    }
  }
  const json = localStorage.getItem(`room:${roomId}`);
  return json ? JSON.parse(json) : { moves: [] };
}

export async function postMove(roomId, move) {
  if (API_URL) {
    try {
      await fetchJson(`${API_URL}/rooms/${roomId}/moves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(move),
      });
      return;
    } catch (err) {
      console.warn('Falling back to localStorage moves:', err);
    }
  }
  // Fallback: update localStorage directly
  const room = await getRoom(roomId);
  room.moves.push(move);
  localStorage.setItem(`room:${roomId}`, JSON.stringify(room));
}