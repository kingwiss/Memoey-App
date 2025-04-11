import { useState } from 'react';
import './App.css';
import './Settings.css';
import './TechniquePopup.css';
import './Exercise.css';
import './SubmissionsViewer.css';
import Exercise from './components/Exercise';
import TechniquePopup from './components/TechniquePopup';
import SubmissionsRoute from './components/SubmissionsRoute';
import logo from './assets/logo-new.svg';
import { FloatingButtons } from './FloatingButtons';

// Import SVG assets
import methodOfLociIcon from './assets/method-of-loci.svg';
import chunkingIcon from './assets/chunking.svg';
import activeRecallIcon from './assets/active-recall.svg';
import mindMappingIcon from './assets/mind-mapping.svg';

// Define memory techniques
// Commented out for now as it's not being used yet
/*
const memoryTechniques = [
  {
    title: 'Method of Loci',
    icon: methodOfLociIcon,
    description: 'Associate items with specific locations in a familiar place.'
  },
  {
    title: 'Chunking',
    icon: chunkingIcon,
    description: 'Group items into meaningful chunks for easier recall.'
  },
  {
    title: 'Active Recall',
    icon: activeRecallIcon,
    description: 'Test yourself actively rather than passively reviewing.'
  },
  {
    title: 'Mind Mapping',
    icon: mindMappingIcon,
    description: 'Create visual connections between items to remember.'
  }
];
*/

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

// App routes
type AppRoute = 'home' | 'category' | 'exercise' | 'submissions';

function App() {
  // State management
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  const [settings, setSettings] = useState<Settings>({
    difficulty: 'medium',
    timingMode: 'untimed',
    displayMode: 'simultaneous'
  });
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<{
    title: string;
    icon: string;
    description: string;
  } | null>(null);

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

  // Handle category selection
  const handleCategorySelect = (categoryId: Category['id']) => {
    setSelectedCategory(categoryId);
  };

  const handleLogoClick = () => {
    setSelectedCategory(null);
    setIsExerciseStarted(false);
    setCurrentRoute('home');
  };

  const renderHeader = () => (
    <header className="app-header">
      <img 
        src={logo} 
        alt="Memory Trainer Logo" 
        className="app-logo" 
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      />
    </header>
  );

  const renderContent = () => {
    if (currentRoute === 'submissions') {
      return <SubmissionsRoute />;
    }
    
    if (isExerciseStarted) {
      return (
        <Exercise 
          category={selectedCategory!}
          settings={settings}
          onExit={(goHome) => {
            setIsExerciseStarted(false);
            // If goHome is true, reset the selectedCategory to return to main menu
            if (goHome) {
              setSelectedCategory(null);
            }
          }}
        />
      );
    }

    if (selectedCategory) {
    return (
      <div className="app-container">
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

            <button className="start-button" onClick={handleStartExercise}>
              Start Exercise
            </button>
          </div>
        </div>
      </div>
    );
  }

    return (
      <div>
        <header>
          <h1>Memory Training</h1>
          <p>Choose your exercise type</p>
        </header>
      <div className="categories-container">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="category-icon">
              {category.id === 'shapes' && <div className="icon-shape"></div>}
              {category.id === 'objects' && <div className="icon-object"></div>}
              {category.id === 'foods' && <div className="icon-food"></div>}
              {category.id === 'cards' && <div className="icon-card"></div>}
            </div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>

      <div className="techniques-section">
        <header>
          <h2>Effective Memory Techniques</h2>
          <p>Learn and practice these proven methods</p>
        </header>
        <div className="techniques-container">
          <div 
            className="technique-card"
            onClick={() => setSelectedTechnique({
              title: 'Method of Loci',
              icon: methodOfLociIcon,
              description: 'Use spatial memory to remember information'
            })}
          >
            <div className="technique-icon">
              <img src={methodOfLociIcon} alt="Method of Loci" />
            </div>
            <h3>Method of Loci</h3>
            <p>Use spatial memory to remember information</p>
          </div>
          <div 
            className="technique-card"
            onClick={() => setSelectedTechnique({
              title: 'Chunking',
              icon: chunkingIcon,
              description: 'Group information into meaningful units'
            })}
          >
            <div className="technique-icon">
              <img src={chunkingIcon} alt="Chunking" />
            </div>
            <h3>Chunking</h3>
            <p>Group information into meaningful units</p>
          </div>
          <div 
            className="technique-card"
            onClick={() => setSelectedTechnique({
              title: 'Mind Mapping',
              icon: mindMappingIcon,
              description: 'Create visual connections between ideas'
            })}
          >
            <div className="technique-icon">
              <img src={mindMappingIcon} alt="Mind Mapping" />
            </div>
            <h3>Mind Mapping</h3>
            <p>Create visual connections between ideas</p>
          </div>
          <div 
            className="technique-card"
            onClick={() => setSelectedTechnique({
              title: 'Active Recall',
              icon: activeRecallIcon,
              description: 'Test yourself to strengthen memory'
            })}
          >
            <div className="technique-icon">
              <img src={activeRecallIcon} alt="Active Recall" />
            </div>
            <h3>Active Recall</h3>
            <p>Test yourself to strengthen memory</p>
          </div>
        </div>
      </div>

      {selectedTechnique && (
        <TechniquePopup
          technique={selectedTechnique}
          onClose={() => setSelectedTechnique(null)}
        />
      )}
      </div>
    );
  };

  return (
    <div className="app">
      {renderHeader()}
      {renderContent()}
      <FloatingButtons />
    </div>
  );
}

export default App;