import React from 'react';
import { Link } from 'react-router-dom';
import PlayerBanner from './PlayerBanner.jsx';
import { PlayerProvider } from '../context/PlayerContext.jsx';

// Layout component that wraps every page with a header showing the player's name
// and a link back to the hub. It also provides the PlayerContext.
export default function Layout({ children }) {
  return (
    <PlayerProvider>
      <div>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--card-bg)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            GameHub
          </Link>
          <PlayerBanner />
        </header>
        <main className="container">{children}</main>
      </div>
    </PlayerProvider>
  );
}