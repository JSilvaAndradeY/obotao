

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const emptyBoard = ["", "", "", "", "", "", "", "", ""];
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [message, setMessage] = useState("");

  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6],           // diagonais
  ];

  function checkWinner(updatedBoard) {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a];
      }
    }
    return null;
  }

  function handlePress(index) {
    if (board[index] !== "" || message !== "") return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      setMessage(`Jogador ${winner} venceu!`);
      if (winner === "X") setScoreX(scoreX + 1);
      else setScoreO(scoreO + 1);
      setTimeout(resetBoard, 1500);
      return;
    }

    if (!updatedBoard.includes("")) {
      setMessage("Empate!");
      setTimeout(resetBoard, 1500);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function resetBoard() {
    setBoard(emptyBoard);
    setMessage("");
    setCurrentPlayer("X");
  }

  function resetAll() {
    resetBoard();
    setScoreX(0);
    setScoreO(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>X: {scoreX}</Text>
        <Text style={styles.score}>O: {scoreO}</Text>
      </View>

      <Text style={styles.turn}>Vez do jogador: {currentPlayer}</Text>
      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetText}>Resetar Placar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  scoreContainer: { flexDirection: "row", marginBottom: 10 },
  score: { fontSize: 20, marginHorizontal: 20 },
  turn: { fontSize: 18, marginBottom: 10 },
  message: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 },
  board: { width: 300, height: 300, flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: { fontSize: 40, fontWeight: "bold" },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  resetText: { color: "#fff", fontSize: 18 },
});