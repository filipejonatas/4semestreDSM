import React from "react";

const GameWaiting: React.FC = () => (
  <div>
    <h2>Waiting for motion sensor...</h2>
    <p>Move in front of the sensor to start the countdown!</p>
    {/* You can add a spinner or animation here */}
  </div>
);

export default GameWaiting;