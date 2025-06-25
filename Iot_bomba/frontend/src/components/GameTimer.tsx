import React from "react";
import { useGame } from "../context/GameContext";

type GameTimerProps = {
  timeRemaining: number;
};

const GameTimer: React.FC<GameTimerProps> = ({ timeRemaining }) => {
  const { formatTime } = useGame();
  return (
    <div>
      <span>Time: {formatTime(timeRemaining)}</span>
    </div>
  );
};

export default GameTimer;