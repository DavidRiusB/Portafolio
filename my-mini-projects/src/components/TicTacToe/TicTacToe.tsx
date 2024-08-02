import React, { useState } from "react";

interface SqueareProps {
  value: string | null;
  onClick: () => void;
}

const Squeare: React.FC<SqueareProps> = ({ value, onClick }) => {
  return <div onClick={onClick}>{value}</div>;
};

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (index: number) => {
    if (squares[index] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
    checkWinner(newSquares);
  };

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], // Horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonal
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        return;
      }
    }
    if (!squares.includes(null) && !winner) {
      setWinner("Draw");
    }
  };
  const currentPlayer = isXNext ? "X" : "O";
  return (
    <div>
      <div>
        Next Player : <span>{currentPlayer}</span>
      </div>
      <div>
        Winner: <span>{winner || ""}</span>
      </div>
      <div>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div>
        {squares.map((value, index) => (
          <Squeare
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default TicTacToe;
