import React from 'react';
import { Link } from 'react-router-dom';

// GameCard displays a single game entry on the Hub page.
// It takes a title, description, route, and optionally children for icons.
export default function GameCard({ title, description, route }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ flex: 1 }}>{description}</p>
      <Link to={route} className="btn" style={{ alignSelf: 'flex-start' }}>
        Play
      </Link>
    </div>
  );
}