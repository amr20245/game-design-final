# GameHub Final Project

Welcome to **GameHub**, a web-based collection of classic games built with React and Vite. This project was designed as a capstone to demonstrate mastery of modern frontend development, state management, routing, and testing. The goal is to deliver a polished single-page application that allows a player to enter their name, play multiple games, and enjoy a responsive experience across different devices.

## Features

- **Single Page Application (SPA):** Uses React Router for client‑side navigation between pages without refreshing the browser.
- **Four Games:**
  - **Rock Paper Scissors:** Play against the computer with a running score.
  - **Tic Tac Toe:** Invite a friend via a shareable room link or play locally. Includes a mock API adapter and localStorage fallback for multiplayer support.
  - **Wordle:** Guess a secret five‑letter word in six tries with colourful feedback for each letter.
  - **Memory Cards:** Flip cards to match all pairs, tracking the number of moves you make.
- **Player Persistence:** Enter your player name once on the hub and it will appear across all pages via React context and localStorage.
- **Responsive Layout:** Uses CSS grid and flexbox to adapt to different screen sizes. Styling is intentionally minimalistic and accessible.
- **Playwright Test Suite:** Includes tests for the hub and each individual game to verify core functionality and routing.
- **Deployment Ready:** Configured for Vite, with scripts to build and preview the production bundle. Instructions for deploying to Vercel, Netlify, or GitHub Pages are provided below.

## Getting Started

### Prerequisites

Ensure you have a recent version of [Node.js](https://nodejs.org/) installed. We recommend Node 18 or later.

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

### Running Tests

This project uses [Playwright](https://playwright.dev/) for end‑to‑end testing. To run the test suite in headless mode:

```bash
npm test
```

To run the tests with the interactive UI for debugging:

```bash
npm run test:ui
```

### Building for Production

Generate an optimized production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Deployment

You can deploy the contents of the `dist` folder to any static hosting platform. Here are a few common workflows:

#### Vercel

```bash
npm install -g vercel
vercel
```

Follow the interactive prompts to set up your project. Vercel will automatically detect the Vite build.

#### Netlify

```bash
npm run build
```

Then drag the `dist` folder into the Netlify dashboard or use the Netlify CLI for deployment.

#### GitHub Pages

Install the `gh-pages` package as a dev dependency:

```bash
npm install gh-pages --save-dev
```

Add the following script to your `package.json`:

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Run the deploy script:

```bash
npm run deploy
```

If you are deploying to a subpath, update the `base` option in `vite.config.js` accordingly.

## Project Structure

```
gamehub-final-project/
├── index.html           # root HTML file
├── package.json         # npm scripts and dependencies
├── vite.config.js       # Vite configuration
├── src/
│   ├── main.jsx         # Application entry point
│   ├── App.jsx          # Route definitions
│   ├── styles.css       # Global styles
│   ├── api/
│   │   └── gameRoomApi.js    # Multiplayer API adapter
│   ├── context/
│   │   └── PlayerContext.jsx  # React context for player name
│   ├── components/
│   │   ├── Layout.jsx         # Common page layout
│   │   ├── GameCard.jsx       # Hub game card component
│   │   └── PlayerBanner.jsx   # Displays the player's name
│   └── pages/
│       ├── Hub.jsx            # Hub page listing all games
│       ├── RockPaperScissors.jsx
│       ├── TicTacToe.jsx
│       ├── Wordle.jsx
│       └── MemoryCards.jsx
└── tests/
    ├── hub.spec.ts
    ├── rps.spec.ts
    ├── tictactoe.spec.ts
    ├── wordle.spec.ts
    └── memorycards.spec.ts
```

## Known Limitations

- The included Wordle dictionary is a small sample; adding a larger word list will improve replayability.
- The Tic Tac Toe multiplayer implementation uses a naive polling strategy and localStorage fallback. In a production environment you might replace this with WebSockets or a backend service.
- Styling is intentionally simple and can be customized further.

## Contributing

Contributions are welcome! If you find a bug or have suggestions for improvements, please open an issue or submit a pull request.

---

Have fun playing and building with GameHub! 🎮