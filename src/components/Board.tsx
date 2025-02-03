import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { checkWinner } from "../utils/gameLogic";
import Cell from "./Cell";

const Board = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [moveQueue, setMoveQueue] = useState<number[]>([]);
  const [gameReset, setGameReset] = useState<boolean>(false); // 🆕 Yeni state eklendi

  const winner = checkWinner(board);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    const newMoveQueue = [...moveQueue, index];

    if (newMoveQueue.length > 6) {
      const oldestMove = newMoveQueue.shift();
      if (oldestMove !== undefined) {
        newBoard[oldestMove] = null;
      }
    }

    setBoard(newBoard);
    setMoveQueue(newMoveQueue);
    setIsXNext(!isXNext);
    setGameReset(false); // 🆕 Reset edildiğinde eski fading hatası olmasın

    if (checkWinner(newBoard)) {
      setTimeout(() => Alert.alert(`Kazanan: ${checkWinner(newBoard)}`), 100);
    } else if (!newBoard.includes(null)) {
      setTimeout(() => Alert.alert("Berabere!"), 100);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setMoveQueue([]);
    setIsXNext(true);
    setGameReset(true); // 🆕 Bu state Cell.tsx içinde fading resetlemek için kullanılıyor
  };

  return (
    <View>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell as "X" | "O" | null}
            onPress={() => handlePress(index)}
            isFading={!gameReset && moveQueue.length >= 5 && moveQueue[0] === index} // 🆕 Reset sonrası fading sıfırlanıyor
          />
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Yeniden Başlat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  resetButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#3498db', // Klasik mavi
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default Board;
