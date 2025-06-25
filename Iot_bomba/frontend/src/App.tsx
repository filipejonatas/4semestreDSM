import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GameProvider } from "./context/GameContext"; 
import AppRoutes from "./routes/Routes";

const App: React.FC = () => (
  <Router>
    <GameProvider>
      <AppRoutes />
    </GameProvider>
  </Router>
);

export default App;