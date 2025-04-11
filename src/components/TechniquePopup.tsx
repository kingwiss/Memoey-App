import { useState } from 'react';
import '../TechniquePopup.css';

interface TechniquePopupProps {
  technique: {
    title: string;
    icon: string;
    description: string;
  };
  onClose: () => void;
}

interface TechniqueContent {
  title: string;
  content: JSX.Element;
  image: string;
}

const getTechniqueContent = (title: string): TechniqueContent[] => {
  switch (title) {
    case 'Method of Loci':
      return [
        {
          title: 'What is the Method of Loci?',
          content: (
            <div>
              <p>The Method of Loci (or Memory Palace) is a powerful spatial memory technique that dates back to ancient Greece and Rome.</p>
              <ul>
                <li>Create a mental journey through a familiar place</li>
                <li>Place items you want to remember at specific locations</li>
                <li>To recall, mentally walk through your journey</li>
              </ul>
            </div>
          ),
          image: '/src/assets/method-of-loci.svg'
        },
        {
          title: 'How to Use It',
          content: (
            <div>
              <p>Follow these steps to create your own memory palace:</p>
              <ol>
                <li>Choose a familiar location (your home, workplace, etc.)</li>
                <li>Define a specific path through this location</li>
                <li>Identify 5-10 distinct spots along your path</li>
                <li>Associate each item with a specific location</li>
                <li>Make associations vivid and unusual</li>
              </ol>
            </div>
          ),
          image: '/src/assets/method-of-loci.svg'
        },
        {
          title: 'Benefits',
          content: (
            <div>
              <p>This technique offers several advantages:</p>
              <ul>
                <li>Excellent for remembering ordered lists</li>
                <li>Creates strong, long-lasting memories</li>
                <li>Improves with practice</li>
                <li>Can store vast amounts of information</li>
                <li>Used by memory champions worldwide</li>
              </ul>
            </div>
          ),
          image: '/src/assets/method-of-loci.svg'
        }
      ];
    case 'Chunking':
      return [
        {
          title: 'What is Chunking?',
          content: (
            <div>
              <p>Chunking is a memory technique that involves breaking down large pieces of information into smaller, manageable units or "chunks."</p>
              <p>Our brains can typically hold 4-7 items in short-term memory, but by chunking information, we can remember more.</p>
            </div>
          ),
          image: '/src/assets/chunking.svg'
        },
        {
          title: 'How to Use Chunking',
          content: (
            <div>
              <p>Examples of chunking in action:</p>
              <ul>
                <li><strong>Phone numbers:</strong> 1234567890 → 123-456-7890</li>
                <li><strong>Digits of π:</strong> 3.14159265 → 3.14 - 159 - 265</li>
                <li><strong>Shopping list:</strong> Group by category (dairy, produce, etc.)</li>
                <li><strong>Vocabulary:</strong> Group words by theme or category</li>
              </ul>
            </div>
          ),
          image: '/src/assets/chunking.svg'
        },
        {
          title: 'Benefits of Chunking',
          content: (
            <div>
              <ul>
                <li>Increases memory capacity</li>
                <li>Makes complex information more manageable</li>
                <li>Improves recall speed</li>
                <li>Reduces cognitive load</li>
                <li>Can be combined with other memory techniques</li>
              </ul>
            </div>
          ),
          image: '/src/assets/chunking.svg'
        }
      ];
    case 'Mind Mapping':
      return [
        {
          title: 'What is Mind Mapping?',
          content: (
            <div>
              <p>Mind mapping is a visual thinking tool that helps organize information by creating a diagram that represents connections between concepts.</p>
              <p>It mimics how our brains naturally connect information, making it easier to remember.</p>
            </div>
          ),
          image: '/src/assets/mind-mapping.svg'
        },
        {
          title: 'Creating a Mind Map',
          content: (
            <div>
              <ol>
                <li>Start with a central idea in the middle of a blank page</li>
                <li>Draw branches extending from the center with main themes</li>
                <li>Add smaller branches with related concepts</li>
                <li>Use colors, images, and symbols to enhance memory</li>
                <li>Keep adding connections as you think of them</li>
              </ol>
            </div>
          ),
          image: '/src/assets/mind-mapping.svg'
        },
        {
          title: 'Benefits of Mind Mapping',
          content: (
            <div>
              <ul>
                <li>Improves comprehension of complex topics</li>
                <li>Enhances creative thinking</li>
                <li>Makes relationships between ideas visible</li>
                <li>Helps with both note-taking and recall</li>
                <li>Engages both hemispheres of the brain</li>
              </ul>
            </div>
          ),
          image: '/src/assets/mind-mapping.svg'
        }
      ];
    case 'Active Recall':
      return [
        {
          title: 'What is Active Recall?',
          content: (
            <div>
              <p>Active recall is a learning technique that involves actively stimulating memory during the learning process.</p>
              <p>Instead of passively reviewing information, you test yourself on what you've learned, which strengthens neural connections.</p>
            </div>
          ),
          image: '/src/assets/active-recall.svg'
        },
        {
          title: 'How to Practice Active Recall',
          content: (
            <div>
              <ul>
                <li>Create flashcards with questions on one side, answers on the other</li>
                <li>After reading material, close the book and write what you remember</li>
                <li>Explain concepts out loud as if teaching someone else</li>
                <li>Create practice tests for yourself</li>
                <li>Use spaced repetition to review at optimal intervals</li>
              </ul>
            </div>
          ),
          image: '/src/assets/active-recall.svg'
        },
        {
          title: 'Benefits of Active Recall',
          content: (
            <div>
              <ul>
                <li>Creates stronger, more durable memories</li>
                <li>Identifies knowledge gaps quickly</li>
                <li>Improves long-term retention</li>
                <li>Enhances understanding of relationships between concepts</li>
                <li>More effective than re-reading or highlighting</li>
              </ul>
            </div>
          ),
          image: '/src/assets/active-recall.svg'
        }
      ];
    default:
      return [
        {
          title: 'Memory Technique',
          content: <p>Information about this memory technique is not available.</p>,
          image: ''
        }
      ];
  }
};

export function TechniquePopup({ technique, onClose }: TechniquePopupProps) {
  const content = getTechniqueContent(technique.title);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < content.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="technique-popup-overlay">
      <div className="technique-popup">
        <button className="popup-close-button" onClick={onClose}>
          ✕
        </button>
        
        <div className="popup-header">
          <h2>{content[currentPage].title}</h2>
        </div>
        
        <div className="popup-content">
          <div className="content-container">
            <div className="text-content">
              {content[currentPage].content}
            </div>
            
            <div className="image-container">
              <img src={technique.icon} alt={technique.title} />
            </div>
          </div>
          
          <div className="navigation-controls">
            <button 
              className="nav-button" 
              onClick={handlePrevious}
              disabled={currentPage === 0}
              title="Previous page"
            >
              ←
            </button>
            <span className="page-indicator">{currentPage + 1} / {content.length}</span>
            <button 
              className="nav-button" 
              onClick={handleNext}
              disabled={currentPage === content.length - 1}
              title="Next page"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechniquePopup;