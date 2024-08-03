import React, { useState } from "react";
import "./TicTacToe.css";

const icons: string[] = [
  "/icons/ticTacToe/PhDogThin.svg",
  "/icons/ticTacToe/Catogram.svg",
  "/icons/ticTacToe/OvineIcons.svg",
  "/icons/ticTacToe/GameIconsWerewolf.svg",
  "/icons/ticTacToe/GameIconsSpartan.svg",
  "/icons/ticTacToe/FluentEmojiHighContrastDragonFace.svg",
  "/icons/ticTacToe/GameIconsStakeHammer.svg",
  "/icons/ticTacToe/Vampire.svg",
  "/icons/ticTacToe/IonHeartDislike.svg",
  "/icons/ticTacToe/DeviconPlainXd.svg",
  "/icons/ticTacToe/PhSmileyXEyesFill.svg",
  "/icons/ticTacToe/IcOutlineFavorite.svg",
  "/icons/ticTacToe/SolarXxxOutline.svg",
  "/icons/ticTacToe/OiX.svg",
  "/icons/ticTacToe/Fa6SolidO.svg",
];

interface SqueareProps {
  value: string | null;
  onClick: () => void;
  PlayerXIcon: string;
  PlayerOIcon: string;
}

const Squares: React.FC<SqueareProps> = ({
  value,
  onClick,
  PlayerXIcon,
  PlayerOIcon,
}) => {
  return (
    <div className="square" onClick={onClick}>
      {value === "X" && (
        <img src={PlayerXIcon} alt="X Icon" width={60} height={60} />
      )}
      {value === "O" && (
        <img src={PlayerOIcon} alt="O Icon" width={60} height={60} />
      )}
    </div>
  );
};

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [inGame, setInGame] = useState(false);

  const [PlayerXIcon, setPlayerXIcon] = useState<string>(
    "/icons/ticTacToe/OiX.svg"
  );
  const [PlayerOIcon, setPlayerOIcon] = useState<string>(
    "/icons/ticTacToe/Fa6SolidO.svg"
  );

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setInGame(false);
  };

  const startGame = () => {
    resetGame();
    setInGame(true);
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

  const handleXIcon = (icon: string) => {
    setPlayerXIcon(icon);
  };

  const handleOIcon = (icon: string) => {
    setPlayerOIcon(icon);
  };

  return (
    <div className="container">
      {/* Instructions Area */}
      <div className="instructions">
        {!winner ? (
          inGame && currentPlayer ? (
            <>
              <h3>Next Player:</h3>
              <div className="instructions-info">
                {currentPlayer === "X" ? (
                  <img src={PlayerXIcon} alt="icon X" />
                ) : (
                  <img src={PlayerOIcon} alt="icon O" />
                )}
              </div>
            </>
          ) : (
            <h3>Select Your Mark</h3>
          )
        ) : null}

        {winner &&
          (winner !== "Draw" ? (
            <>
              <h3>Winner:</h3>
              <div className="instructions-info">
                {winner === "X" ? (
                  <img src={PlayerXIcon} alt="icon X" />
                ) : winner === "O" ? (
                  <img src={PlayerOIcon} alt="icon O" />
                ) : null}
              </div>
            </>
          ) : (
            <>
              <h3>Draw:</h3>
              <div className="draw ">
                <img src={PlayerXIcon} alt="icon X" />
              </div>
              <div className="draw ">
                <img src={PlayerOIcon} alt="icon O" />
              </div>
            </>
          ))}
      </div>

      {/* Game Start/Reset Button */}
      <div>
        {inGame || winner ? (
          <button className="button" onClick={resetGame}>
            Reset
          </button>
        ) : (
          <button className="button" onClick={startGame}>
            Start
          </button>
        )}
      </div>

      {/* Game Container with Players and Board */}
      <div className="game-container">
        {/* Player X Icons */}

        {!inGame ? (
          <div className="player-icons-l">
            <p>Player X</p>
            <div className="icons">
              {icons.map((icon, index) => (
                <div
                  className="icon"
                  key={index}
                  onClick={() => handleXIcon(icon)}
                >
                  <img src={icon} alt="icon" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="player-icons-l">
            <p>Player X</p>
            <div>
              <img src={PlayerXIcon} alt="" />
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="board">
          {squares.map((value, index) => (
            <Squares
              key={index}
              value={value}
              onClick={() => handleClick(index)}
              PlayerXIcon={PlayerXIcon}
              PlayerOIcon={PlayerOIcon}
            />
          ))}
        </div>

        {/* Player O Icons */}
        {!inGame ? (
          <div className="player-icons-r">
            <p>Player O</p>
            <div className="icons">
              {icons.map((icon, index) => (
                <div
                  className="icon"
                  key={index}
                  onClick={() => handleOIcon(icon)}
                >
                  <img src={icon} alt="icon" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="player-icons-r">
            <p>Player O</p>
            <div>
              <img src={PlayerOIcon} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
