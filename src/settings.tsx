import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

interface SettingsProps {
  onStartExercise: (settings: {
    difficulty: string;
    timer: string;
    displayMode: string;
  }) => void;
}

export function Settings({ onStartExercise }: SettingsProps) {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('medium');
  const [timer, setTimer] = useState('untimed');
  const [displayMode, setDisplayMode] = useState('simultaneous');

  const handleStartExercise = () => {
    onStartExercise({
      difficulty,
      timer,
      displayMode,
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="navigation-buttons">
          <button
            className="nav-button"
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            <span>←</span> Back
          </button>
          <button
            className="nav-button"
            onClick={() => navigate('/home')}
            aria-label="Go to home"
          >
            Home
          </button>
        </div>
      </div>

      <div className="settings-content">
        <h2>Exercise Settings</h2>

        <div className="settings-group">
          <h3>Difficulty</h3>
          <div className="settings-options">
            <button
              className={`option-button ${difficulty === 'easy' ? 'selected' : ''}`}
              onClick={() => setDifficulty('easy')}
              aria-pressed={difficulty === 'easy'}
            >
              Easy
            </button>
            <button
              className={`option-button ${difficulty === 'medium' ? 'selected' : ''}`}
              onClick={() => setDifficulty('medium')}
              aria-pressed={difficulty === 'medium'}
            >
              Medium
            </button>
            <button
              className={`option-button ${difficulty === 'hard' ? 'selected' : ''}`}
              onClick={() => setDifficulty('hard')}
              aria-pressed={difficulty === 'hard'}
            >
              Hard
            </button>
          </div>
        </div>

        <div className="settings-group">
          <h3>Timer</h3>
          <div className="settings-options">
            <button
              className={`option-button ${timer === 'fixed' ? 'selected' : ''}`}
              onClick={() => setTimer('fixed')}
              aria-pressed={timer === 'fixed'}
            >
              Fixed
            </button>
            <button
              className={`option-button ${timer === 'untimed' ? 'selected' : ''}`}
              onClick={() => setTimer('untimed')}
              aria-pressed={timer === 'untimed'}
            >
              Untimed
            </button>
          </div>
        </div>

        <div className="settings-group">
          <h3>Display Mode</h3>
          <div className="settings-options">
            <button
              className={`setting-button ${displayMode === 'simultaneous' ? 'selected' : ''}`}
              onClick={() => setDisplayMode('simultaneous')}
              aria-pressed={displayMode === 'simultaneous'}
            >
              Simultaneous
            </button>
            <button
              className={`setting-button ${displayMode === 'sequential' ? 'selected' : ''}`}
              onClick={() => setDisplayMode('sequential')}
              aria-pressed={displayMode === 'sequential'}
            >
              Sequential
            </button>
          </div>
        </div>

        <button 
          className="start-button" 
          onClick={handleStartExercise}
          aria-label="Start exercise with selected settings"
        >
          Start Exercise
        </button>
      </div>
    </div>
  );
}