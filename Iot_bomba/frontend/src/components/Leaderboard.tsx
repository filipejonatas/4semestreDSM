import React from "react";
import { LeaderboardEntry } from "../types/game";

type LeaderboardProps = {
  entries: LeaderboardEntry[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => (
  <div>
    <h2>Leaderboard</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
          <th>Topic</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.name}</td>
            <td>{entry.score}</td>
            <td>{entry.time}s</td>
            <td>{entry.topic}</td>
            <td>{new Date(entry.date).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Leaderboard;