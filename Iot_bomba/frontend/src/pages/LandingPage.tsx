import React, { useState } from "react";
import PlayerForm from "../components/PlayerForm";
import { useGame } from "../context/GameContext";
import { gameApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const topics = [
  "Conhecimento Gerais",
  "Ciência",
  "História",
  "Esportes",
  "Technologia",
  "Filmes"
];

const LandingPage: React.FC = () => {
  const { dispatch } = useGame();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async (name: string, topic: string) => {
    setLoading(true);
    try {
      const res = await gameApi.register(name, topic);
      dispatch({
        type: "SET_SESSION",
        payload: {
          id: res.sessionId,
          user_id: 0,
          topic,
          score: 0,
          status: "waiting"
        }
      });
      navigate("/game"); 
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to start game." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>B-O-Bomb</h1>
      <PlayerForm onSubmit={handleStart} topics={topics} loading={loading} />
    </div>
  );
};

export default LandingPage;