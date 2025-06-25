import React from "react";

type GameResultProps = {
  success: boolean;
  score: number;
  sessionId?: string;
  onRestart: () => void;
};

const GameResult: React.FC<GameResultProps> = ({ success, score, onRestart }) => (
  <div>
    <h2>{success ? "Bomb Defused!" : "Bomb Exploded!"}</h2>
    <p>Score: {score}</p>
    <button onClick={onRestart}>Play Again</button>
  </div>
);

export default GameResult;