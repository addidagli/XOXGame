export const checkWinner = (board: Array<string | null>) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
    [0, 4, 8], [2, 4, 6], // Çapraz
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningCells: [a, b, c] }; // 🆕 Kazananı ve hücreleri döndür
    }
  }
  return { winner: null, winningCells: [] };
};
