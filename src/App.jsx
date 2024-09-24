import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null); // To track the winning line

  const result = calculateWinner(squares);

  const winner = result ? result.winner : null;
  const winLine = result ? result.line : null;

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    if (winLine) {
      setWinningLine(winLine);
    }
  };

  const renderSquare = (index) => {
    const value = squares[index];
    let className = "square";
    if (value === "X") className += " player-x";
    if (value === "O") className += " player-o";
    if (winningLine?.includes(index)) className += " winning-square";

    return (
      <button className={className} onClick={() => handleClick(index)}>
        {value}
      </button>
    );
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null); // Reset the winning line
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {squares.map((square, index) => renderSquare(index))}
      </div>
      <div className="info">
        {!winner && <p>Next Player: {isXNext ? "X" : "O"}</p>}
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      {winner && (
        <div className="winner-overlay">
          <div className="winner-message">
            <p>Winner: {winner}</p>
            <button className="reset-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Updated function to return both winner and winning line
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }; // Return winner and winning line
    }
  }
  return null;
};

export default App;
