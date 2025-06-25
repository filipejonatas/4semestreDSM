import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages/GamePage";
import ResultsPage from "../pages/ResultsPage";
import Leaderboard from "../pages/Leaderboard";

const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
);

export default AppRoutes;