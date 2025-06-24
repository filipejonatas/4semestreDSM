import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameApi } from '../services/api';
import { useGame } from '../context/GameContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const TOPICS = [
  'Science',
  'History',
  'Geography',
  'Sports',
  'Entertainment',
  'Technology'
];

const LandingPage: React.FC = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !topic) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await gameApi.register(name.trim(), topic);
      
      const initialSession = {
        id: response.sessionId,
        user_id: 0,
        topic,
        status: 'waiting' as const,
        score: 0
      };
      
      dispatch({ type: 'SET_SESSION', payload: initialSession });
      navigate(`/game/${response.sessionId}`);
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to register. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 w-full max-w-md border border-red-500/30 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-red-500 mb-2 animate-pulse">💣 B-O-BOMB</h1>
          <p className="text-gray-300 text-lg">Defuse the bomb before time runs out!</p>
          <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/50">
            <p className="text-sm text-red-200">
              ⚠️ You have <span className="font-bold text-red-400">2 minutes</span> to answer <span className="font-bold text-red-400">5 questions</span> correctly
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Enter your name"
              required
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quiz Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
              required
            >
              <option value="">Select a topic</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {state.error && <ErrorMessage message={state.error} />}

          <button
            type="submit"
            disabled={state.loading || !name.trim() || !topic}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors transform hover:scale-105 active:scale-95"
          >
            {state.loading ? <LoadingSpinner text="Registering..." /> : 'START GAME'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => navigate('/leaderboard')}
            className="text-red-400 hover:text-red-300 underline transition-colors"
          >
            View Leaderboard
          </button>
          <div className="text-xs text-gray-500">
            Scan QR code or visit directly to play
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;