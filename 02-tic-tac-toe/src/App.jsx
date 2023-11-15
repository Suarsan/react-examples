import './App.css'
import { useState } from 'react'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js' 
import { checkWinner, checkEndGame } from './utils'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    if (turnFromLocalStorage) return JSON.parse(turnFromLocalStorage)
    return TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn;
    setBoard(newBoard)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square 
                updateBoard={updateBoard} 
                key={index} 
                index={index}>{board[index]}</Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={ turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={ turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? "Empate" : "Ganó:"
                }
              </h2>
              <header className="win">
                { winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetBoard}>Empezar de nuevo</button>
              </footer>
            </div>
          </section> 
        )
      }
      {
        board.every((square) => square === null) || (
          <button onClick={resetBoard}>Volver a empezar</button>
        )
      }
    </main>
  )
}

export default App
