import React, { useCallback, useEffect, useState } from "react";
import Box from "./Box";

const GameBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState("X");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handlePlayerMove = useCallback(
    (index) => {
      if (board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = playerSymbol;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    },
    [board, winner, playerSymbol]
  );

  const getComputerMove = async () => {
    try {
      const response = await fetch(
        "https://hiring-react-assignment.vercel.app/api/bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(board),
        }
      );

      const text = await response.text();

      if (!text) {
        console.error("Empty response from the API");
        return;
      }

      const newBoard = [...board];
      newBoard[+text] = playerSymbol === "X" ? "O" : "X";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkForWinner = useCallback(() => {
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
    for (const element of lines) {
      const [a, b, c] = element;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) setWinner("Tie");
  }, [board]);

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayerSymbol("X");
  };

  useEffect(() => {
    checkForWinner();
    if (!isPlayerTurn && !winner) {
      getComputerMove();
    }
  }, [isPlayerTurn, board, checkForWinner, winner]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#8395A7",
      }}
    >
      <div
        style={{
          position: "absolute",
          margin: "-400px 0 0 0",
        }}
      >
        {winner ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#A4B0BD",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            <h1>Winner: {winner}</h1>
            <button
              style={{
                textAlign: "center",
                fontWeight: "bold",
                padding: "10px",
                margin: "10px",
                backgroundColor: "#DAE0E2",
                color: "#2B2B52",
                borderRadius: "10px",
              }}
              onClick={resetBoard}
            >
              Reset Board
            </button>
          </div>
        ) : (
          <h1>
            Current Player:
            {isPlayerTurn ? playerSymbol : playerSymbol === "X" ? "O" : "X"}
          </h1>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          border: "4px solid black",
          placeItems: "center",
        }}
      >
        {board.map((value, index) => (
          <Box
            key={index}
            value={value}
            onClick={() => handlePlayerMove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
