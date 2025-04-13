import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Settings.css';
import './TechniquePopup.css';
import './Exercise.css';
import './SubmissionsViewer.css';
import Exercise from './components/Exercise';
import SubmissionsRoute from './components/SubmissionsRoute';
import logo from './assets/logo-new.svg';
import { FloatingButtons } from './components/FloatingButtons';

// Define interfaces
interface Category {
  id: 'objects' | 'shapes' | 'foods' | 'cards';
  title: string;
  description: string;
}

interface Settings {
  difficulty: 'easy' | 'medium' | 'hard';
  timingMode: 'timed' | 'untimed';
  displayMode: 'simultaneous' | 'sequential';
}

function App() {
  // State management

  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  const [settings, setSettings] = useState<Settings>({
    difficulty: 'medium',
    timingMode: 'untimed',
    displayMode: 'simultaneous'
  });
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);

  // Define memory categories
  const categories: Category[] = [
    {
      id: 'objects',
      title: 'Objects',
      description: 'Memorize everyday objects'
    },
    {
      id: 'shapes',
      title: 'Shapes',
      description: 'Remember geometric shapes'
    },
    {
      id: 'foods',
      title: 'Foods',
      description: 'Recall different food items'
    },
    {
      id: 'cards',
      title: 'Cards',
      description: 'Remember playing cards'
    }
  ];

  const handleSettingChange = (setting: keyof Settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleStartExercise = () => {
    setIsExerciseStarted(true);
  };

  const handleCategorySelect = (categoryId: Category['id']) => {
    setSelectedCategory(categoryId);
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setIsExerciseStarted(false);
  };

  return (
    <Router basename="/Memoey-App">
      <div className="app-container">
        <FloatingButtons />
        <header className="app-header">
          <img 
            src={logo} 
            alt="Memory Trainer Logo" 
            className="app-logo" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
        </header>
        <Routes>
          <Route path="/submissions" element={<SubmissionsRoute />} />
          <Route
            path="/"
            element={
              isExerciseStarted && selectedCategory ? (
                <Exercise
                  category={selectedCategory}
                  settings={settings}
                  onExit={(goHome) => {
                    setIsExerciseStarted(false);
                    if (goHome) {
                      setSelectedCategory(null);
                    }
                  }}
                />
              ) : (
                <div className="app-content">
                  {selectedCategory ? (
                    <div className="settings-container">
                      <div className="settings-header">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="nav-button"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="nav-button"
                        >
                          🏠 Home
                        </button>
                      </div>
                      <div className="settings-content">
                        <h2>Exercise Settings</h2>
                        <div className="settings-group">
                          <h3>Difficulty</h3>
                          <div className="settings-options">
                            {['easy', 'medium', 'hard'].map(level => (
                              <button
                                key={level}
                                className={`setting-button ${settings.difficulty === level ? 'selected' : ''}`}
                                onClick={() => handleSettingChange('difficulty', level)}
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="settings-group">
                          <h3>Timer</h3>
                          <div className="settings-options">
                            {['timed', 'untimed'].map(mode => (
                              <button
                                key={mode}
                                className={`setting-button ${settings.timingMode === mode ? 'selected' : ''}`}
                                onClick={() => handleSettingChange('timingMode', mode)}
                              >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="settings-group">
                          <h3>Display Mode</h3>
                          <div className="settings-options">
                            {['simultaneous', 'sequential'].map(mode => (
                              <button
                                key={mode}
                                className={`setting-button ${settings.displayMode === mode ? 'selected' : ''}`}
                                onClick={() => handleSettingChange('displayMode', mode)}
                              >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          className="start-button"
                          onClick={handleStartExercise}
                        >
                          Start Exercise
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="categories-grid">
                      {categories.map(category => (
                        <div
                          key={category.id}
                          className="category-card"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          <h3>{category.title}</h3>
                          <p>{category.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;