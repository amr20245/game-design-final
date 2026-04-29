import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function Hub(){
  return (
    <div>
      <h1>GameHub</h1>
      <input placeholder="Player name" onChange={(e)=>localStorage.setItem('player', e.target.value)} />
      <p>Developer: Amr Daraghmeh</p>
      <nav>
        <Link to="/rps">RPS</Link>
        <Link to="/tictactoe">TicTacToe</Link>
        <Link to="/wordle">Wordle</Link>
        <Link to="/memory">Memory</Link>
      </nav>
    </div>
  )
}

const Page = ({title}) => (
  <div>
    <h2>{title}</h2>
    <p>Player: {localStorage.getItem('player')}</p>
    <Link to="/">Back</Link>
  </div>
)

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub/>}/>
        <Route path="/rps" element={<Page title="RPS"/>}/>
        <Route path="/tictactoe" element={<Page title="TicTacToe"/>}/>
        <Route path="/wordle" element={<Page title="Wordle"/>}/>
        <Route path="/memory" element={<Page title="Memory"/>}/>
      </Routes>
    </BrowserRouter>
  )
}
