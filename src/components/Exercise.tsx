import { useState, useEffect } from 'react';
import '../Exercise.css';
import '../Quiz.css';
import '../Navigation.css';

// For drag and drop functionality
type DragItem = MemoryItem & { index: number; sourceDropZoneIndex?: number };

// Define interfaces for the memory items
interface MemoryItem {
  id: string;
  name: string;
  image?: string;
}

// Import SVG assets
import lampSvg from '../assets/objects/lamp.svg';
import chairSvg from '../assets/objects/chair.svg';
import bookSvg from '../assets/objects/book.svg';
import clockSvg from '../assets/objects/clock.svg';
import phoneSvg from '../assets/objects/phone.svg';
import penSvg from '../assets/objects/pen.svg';
import mugSvg from '../assets/objects/mug.svg';
import glassesSvg from '../assets/objects/glasses.svg';

import circleSvg from '../assets/shapes/circle.svg';
import squareSvg from '../assets/shapes/square.svg';
import triangleSvg from '../assets/shapes/triangle.svg';
import rectangleSvg from '../assets/shapes/rectangle.svg';
import pentagonSvg from '../assets/shapes/pentagon.svg';
import hexagonSvg from '../assets/shapes/hexagon.svg';
import octagonSvg from '../assets/shapes/octagon.svg';
import starSvg from '../assets/shapes/star.svg';

import appleSvg from '../assets/foods/apple.svg';
import bananaSvg from '../assets/foods/banana.svg';
import orangeSvg from '../assets/foods/orange.svg';
import strawberrySvg from '../assets/foods/strawberry.svg';
import grapesSvg from '../assets/foods/grapes.svg';
import carrotSvg from '../assets/foods/carrot.svg';
import broccoliSvg from '../assets/foods/broccoli.svg';
import tomatoSvg from '../assets/foods/tomato.svg';

// Import playing card SVGs
import aceOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_ace.svg';
import aceOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_ace.svg';
import aceOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_ace.svg';
import aceOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_ace.svg';
import kingOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_king.svg';
import kingOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_king.svg';
import kingOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_king.svg';
import kingOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_king.svg';
import queenOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_queen.svg';
import queenOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_queen.svg';
import queenOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_queen.svg';
import queenOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_queen.svg';
import jackOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_jack.svg';
import jackOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_jack.svg';
import jackOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_jack.svg';
import jackOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_jack.svg';
import tenOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_10.svg';
import tenOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_10.svg';
import tenOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_10.svg';
import tenOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_10.svg';
import nineOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_9.svg';
import nineOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_9.svg';
import nineOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_9.svg';
import nineOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_9.svg';
import eightOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_8.svg';
import eightOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_8.svg';
import eightOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_8.svg';
import eightOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_8.svg';
import sevenOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_7.svg';
import sevenOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_7.svg';
import sevenOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_7.svg';
import sevenOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_7.svg';
import sixOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_6.svg';
import sixOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_6.svg';
import sixOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_6.svg';
import sixOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_6.svg';
import fiveOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_5.svg';
import fiveOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_5.svg';
import fiveOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_5.svg';
import fiveOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_5.svg';
import fourOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_4.svg';
import fourOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_4.svg';
import fourOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_4.svg';
import fourOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_4.svg';
import threeOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_3.svg';
import threeOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_3.svg';
import threeOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_3.svg';
import threeOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_3.svg';
import twoOfHeartsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/hearts_2.svg';
import twoOfDiamondsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/diamonds_2.svg';
import twoOfClubsSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/clubs_2.svg';
import twoOfSpadesSvg from '../assets/cards/svg_playing_cards/svg_playing_cards/fronts/spades_2.svg';

// Sample data for each category - expanded item pools for randomization
const categoryItemPools: Record<string, MemoryItem[]> = {
  objects: [
    { id: 'obj1', name: 'Lamp', image: lampSvg },
    { id: 'obj2', name: 'Chair', image: chairSvg },
    { id: 'obj3', name: 'Book', image: bookSvg },
    { id: 'obj4', name: 'Clock', image: clockSvg },
    { id: 'obj5', name: 'Phone', image: phoneSvg },
    { id: 'obj6', name: 'Pen', image: penSvg },
    { id: 'obj7', name: 'Mug', image: mugSvg },
    { id: 'obj8', name: 'Glasses', image: glassesSvg },
    // Additional objects with reused images for variety
    { id: 'obj9', name: 'Desk Lamp', image: lampSvg },
    { id: 'obj10', name: 'Armchair', image: chairSvg },
    { id: 'obj11', name: 'Notebook', image: bookSvg },
    { id: 'obj12', name: 'Alarm Clock', image: clockSvg },
    { id: 'obj13', name: 'Smartphone', image: phoneSvg },
    { id: 'obj14', name: 'Pencil', image: penSvg },
    { id: 'obj15', name: 'Coffee Cup', image: mugSvg },
    { id: 'obj16', name: 'Sunglasses', image: glassesSvg },
  ],
  shapes: [
    { id: 'shape1', name: 'Circle', image: circleSvg },
    { id: 'shape2', name: 'Square', image: squareSvg },
    { id: 'shape3', name: 'Triangle', image: triangleSvg },
    { id: 'shape4', name: 'Rectangle', image: rectangleSvg },
    { id: 'shape5', name: 'Pentagon', image: pentagonSvg },
    { id: 'shape6', name: 'Hexagon', image: hexagonSvg },
    { id: 'shape7', name: 'Octagon', image: octagonSvg },
    { id: 'shape8', name: 'Star', image: starSvg },
    // Additional shapes with reused images for variety
    { id: 'shape9', name: 'Red Circle', image: circleSvg },
    { id: 'shape10', name: 'Blue Square', image: squareSvg },
    { id: 'shape11', name: 'Green Triangle', image: triangleSvg },
    { id: 'shape12', name: 'Yellow Rectangle', image: rectangleSvg },
    { id: 'shape13', name: 'Purple Pentagon', image: pentagonSvg },
    { id: 'shape14', name: 'Orange Hexagon', image: hexagonSvg },
    { id: 'shape15', name: 'Pink Octagon', image: octagonSvg },
    { id: 'shape16', name: 'Gold Star', image: starSvg },
  ],
  foods: [
    { id: 'food1', name: 'Apple', image: appleSvg },
    { id: 'food2', name: 'Banana', image: bananaSvg },
    { id: 'food3', name: 'Orange', image: orangeSvg },
    { id: 'food4', name: 'Strawberry', image: strawberrySvg },
    { id: 'food5', name: 'Grapes', image: grapesSvg },
    { id: 'food6', name: 'Carrot', image: carrotSvg },
    { id: 'food7', name: 'Broccoli', image: broccoliSvg },
    { id: 'food8', name: 'Tomato', image: tomatoSvg },
    // Additional foods with reused images for variety
    { id: 'food9', name: 'Green Apple', image: appleSvg },
    { id: 'food10', name: 'Plantain', image: bananaSvg },
    { id: 'food11', name: 'Tangerine', image: orangeSvg },
    { id: 'food12', name: 'Wild Berries', image: strawberrySvg },
    { id: 'food13', name: 'Red Grapes', image: grapesSvg },
    { id: 'food14', name: 'Baby Carrots', image: carrotSvg },
    { id: 'food15', name: 'Cauliflower', image: broccoliSvg },
    { id: 'food16', name: 'Cherry Tomato', image: tomatoSvg },
  ],
  cards: [
    // Hearts (Red)
    { id: 'heart1', name: 'Ace of Hearts', image: aceOfHeartsSvg },
    { id: 'heart2', name: 'King of Hearts', image: kingOfHeartsSvg },
    { id: 'heart3', name: 'Queen of Hearts', image: queenOfHeartsSvg },
    { id: 'heart4', name: 'Jack of Hearts', image: jackOfHeartsSvg },
    { id: 'heart5', name: 'Ten of Hearts', image: tenOfHeartsSvg },
    { id: 'heart6', name: 'Nine of Hearts', image: nineOfHeartsSvg },
    { id: 'heart7', name: 'Eight of Hearts', image: eightOfHeartsSvg },
    { id: 'heart8', name: 'Seven of Hearts', image: sevenOfHeartsSvg },
    { id: 'heart9', name: 'Six of Hearts', image: sixOfHeartsSvg },
    { id: 'heart10', name: 'Five of Hearts', image: fiveOfHeartsSvg },
    { id: 'heart11', name: 'Four of Hearts', image: fourOfHeartsSvg },
    { id: 'heart12', name: 'Three of Hearts', image: threeOfHeartsSvg },
    { id: 'heart13', name: 'Two of Hearts', image: twoOfHeartsSvg },
    // Diamonds (Red)
    { id: 'diamond1', name: 'Ace of Diamonds', image: aceOfDiamondsSvg },
    { id: 'diamond2', name: 'King of Diamonds', image: kingOfDiamondsSvg },
    { id: 'diamond3', name: 'Queen of Diamonds', image: queenOfDiamondsSvg },
    { id: 'diamond4', name: 'Jack of Diamonds', image: jackOfDiamondsSvg },
    { id: 'diamond5', name: 'Ten of Diamonds', image: tenOfDiamondsSvg },
    { id: 'diamond6', name: 'Nine of Diamonds', image: nineOfDiamondsSvg },
    { id: 'diamond7', name: 'Eight of Diamonds', image: eightOfDiamondsSvg },
    { id: 'diamond8', name: 'Seven of Diamonds', image: sevenOfDiamondsSvg },
    { id: 'diamond9', name: 'Six of Diamonds', image: sixOfDiamondsSvg },
    { id: 'diamond10', name: 'Five of Diamonds', image: fiveOfDiamondsSvg },
    { id: 'diamond11', name: 'Four of Diamonds', image: fourOfDiamondsSvg },
    { id: 'diamond12', name: 'Three of Diamonds', image: threeOfDiamondsSvg },
    { id: 'diamond13', name: 'Two of Diamonds', image: twoOfDiamondsSvg },
    // Clubs (Black)
    { id: 'club1', name: 'Ace of Clubs', image: aceOfClubsSvg },
    { id: 'club2', name: 'King of Clubs', image: kingOfClubsSvg },
    { id: 'club3', name: 'Queen of Clubs', image: queenOfClubsSvg },
    { id: 'club4', name: 'Jack of Clubs', image: jackOfClubsSvg },
    { id: 'club5', name: 'Ten of Clubs', image: tenOfClubsSvg },
    { id: 'club6', name: 'Nine of Clubs', image: nineOfClubsSvg },
    { id: 'club7', name: 'Eight of Clubs', image: eightOfClubsSvg },
    { id: 'club8', name: 'Seven of Clubs', image: sevenOfClubsSvg },
    { id: 'club9', name: 'Six of Clubs', image: sixOfClubsSvg },
    { id: 'club10', name: 'Five of Clubs', image: fiveOfClubsSvg },
    { id: 'club11', name: 'Four of Clubs', image: fourOfClubsSvg },
    { id: 'club12', name: 'Three of Clubs', image: threeOfClubsSvg },
    { id: 'club13', name: 'Two of Clubs', image: twoOfClubsSvg },
    // Spades (Black)
    { id: 'spade1', name: 'Ace of Spades', image: aceOfSpadesSvg },
    { id: 'spade2', name: 'King of Spades', image: kingOfSpadesSvg },
    { id: 'spade3', name: 'Queen of Spades', image: queenOfSpadesSvg },
    { id: 'spade4', name: 'Jack of Spades', image: jackOfSpadesSvg },
    { id: 'spade5', name: 'Ten of Spades', image: tenOfSpadesSvg },
    { id: 'spade6', name: 'Nine of Spades', image: nineOfSpadesSvg },
    { id: 'spade7', name: 'Eight of Spades', image: eightOfSpadesSvg },
    { id: 'spade8', name: 'Seven of Spades', image: sevenOfSpadesSvg },
    { id: 'spade9', name: 'Six of Spades', image: sixOfSpadesSvg },
    { id: 'spade10', name: 'Five of Spades', image: fiveOfSpadesSvg },
    { id: 'spade11', name: 'Four of Spades', image: fourOfSpadesSvg },
    { id: 'spade12', name: 'Three of Spades', image: threeOfSpadesSvg },
    { id: 'spade13', name: 'Two of Spades', image: twoOfSpadesSvg },
  ],
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Function to get random items based on difficulty
const getRandomItems = (category: string, difficulty: string): MemoryItem[] => {
  const pool = categoryItemPools[category];
  let count: number;
  
  // Determine number of items based on difficulty
  switch (difficulty) {
    case 'easy':
      count = 6;
      break;
    case 'medium':
      count = 10;
      break;
    case 'hard':
      count = 16;
      break;
    default:
      count = 10;
  }
  
  // Shuffle the pool and take the first 'count' items
  return shuffleArray(pool).slice(0, count);
};

// Generate random items for each category
// Using categoryItemPools instead of categoryItems
// const categoryItems: Record<string, MemoryItem[]> = {
//   objects: [],
//   shapes: [],
//   foods: [],
//   cards: []
// };

interface ExerciseProps {
  category: 'objects' | 'shapes' | 'foods' | 'cards';
  settings: {
    difficulty: 'easy' | 'medium' | 'hard';
    timingMode: 'timed' | 'untimed';
    displayMode: 'simultaneous' | 'sequential';
  };
  onExit: (goHome?: boolean) => void;
}

const Exercise: React.FC<ExerciseProps> = ({ category, settings, onExit }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [originalItems, setOriginalItems] = useState<MemoryItem[]>([]);
  const [shuffledItems, setShuffledItems] = useState<MemoryItem[]>([]);
  const [dropZones, setDropZones] = useState<(MemoryItem | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  
  // Generate random items when component mounts or when category/difficulty changes
  useEffect(() => {
    console.log('Setting items for category:', category, 'with difficulty:', settings.difficulty);
    const randomItems = getRandomItems(category, settings.difficulty);
    console.log('Generated items:', randomItems);
    setItems(randomItems);
    setOriginalItems(randomItems); // Store original order for quiz
    
    // Create empty drop zones for the quiz
    const emptyDropZones = Array(randomItems.length).fill(null);
    setDropZones(emptyDropZones);
  }, [category, settings.difficulty]);
  
  // Set timer based on difficulty
  useEffect(() => {
    if (settings.timingMode === 'timed') {
      let seconds = 0;
      switch (settings.difficulty) {
        case 'easy':
          seconds = 15;
          break;
        case 'medium':
          seconds = 30;
          break;
        case 'hard':
          seconds = 60;
          break;
        default:
          seconds = 30;
      }
      setTimeLeft(seconds);
    }
  }, [settings.difficulty, settings.timingMode]);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);
  
  const handleNext = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1);
    }
  };
  
  // Moved handleFinish functionality to handleSubmit
  // const handleFinish = () => {
  //   setIsFinished(true);
  // };
  
  const handleStartQuiz = () => {
    // Create a shuffled copy of the items for the quiz
    const shuffled = shuffleArray([...items]);
    setShuffledItems(shuffled);
    setIsQuizMode(true);
    setIsFinished(false);
  };
  
  // Track touch positions for mobile drag and drop
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchElement, setTouchElement] = useState<HTMLElement | null>(null);
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (item: MemoryItem, index: number) => {
    // Store the source index if the item is coming from a drop zone
    const sourceDropZoneIndex = dropZones.findIndex(zone => zone && zone.id === item.id);
    setDraggedItem({ ...item, index, sourceDropZoneIndex: sourceDropZoneIndex !== -1 ? sourceDropZoneIndex : undefined });
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Enhanced auto-scroll functionality
    const scrollThreshold = 100; // Distance from edges to trigger scroll
    const scrollSpeed = 15; // Base scroll speed
    const container = document.querySelector('.app-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const distanceFromTop = e.clientY - containerRect.top;
    const distanceFromBottom = containerRect.bottom - e.clientY;
    const distanceFromLeft = e.clientX - containerRect.left;
    const distanceFromRight = containerRect.right - e.clientX;
    
    // Calculate scroll speeds based on distance from edges
    const getScrollSpeed = (distance: number) => {
      if (distance >= scrollThreshold) return 0;
      // Exponential scroll speed based on proximity to edge
      return scrollSpeed * (1 - distance / scrollThreshold);
    };
    
    // Vertical scrolling
    const verticalSpeed = distanceFromTop < scrollThreshold
      ? -getScrollSpeed(distanceFromTop)
      : distanceFromBottom < scrollThreshold
      ? getScrollSpeed(distanceFromBottom)
      : 0;
    
    // Horizontal scrolling
    const horizontalSpeed = distanceFromLeft < scrollThreshold
      ? -getScrollSpeed(distanceFromLeft)
      : distanceFromRight < scrollThreshold
      ? getScrollSpeed(distanceFromRight)
      : 0;
    
    // Apply scrolling with smooth animation
    if (verticalSpeed !== 0 || horizontalSpeed !== 0) {
      container.scrollBy({
        top: verticalSpeed,
        left: horizontalSpeed,
        behavior: 'smooth'
      });
    }
  };
  
  const handleDrop = (dropIndex: number) => {
    if (!draggedItem) return;
    
    // Create a new array of drop zones
    const newDropZones = [...dropZones];
    
    // Check if the dragged item is coming from another drop zone
    if (draggedItem.sourceDropZoneIndex !== undefined) {
      // Remove the item from its previous location
      newDropZones[draggedItem.sourceDropZoneIndex] = null;
    }
    
    // If there's already an item in this drop zone, we'll just replace it
    // The UI will show the item back in the draggable items container if needed
    
    // Place the dragged item in the drop zone
    newDropZones[dropIndex] = draggedItem;
    
    // Update the state
    setDropZones(newDropZones);
    setDraggedItem(null);
  };

  // Touch event handlers for mobile drag and drop
  const handleTouchStart = (e: React.TouchEvent, item: MemoryItem, index: number) => {
    if (quizCompleted) return; // Don't allow dragging if quiz is completed
    
    const touch = e.touches[0];
    const element = e.currentTarget as HTMLElement;
    
    // Calculate offset from the touch point to the element's top-left corner
    const rect = element.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchElement(element);
    setTouchOffset({ x: offsetX, y: offsetY });
    
    // Start the drag operation
    handleDragStart(item, index);
    
    // Add visual feedback
    element.style.opacity = '0.7';
    element.style.zIndex = '1000';
    element.style.position = 'fixed';
    element.style.left = `${touch.clientX - offsetX}px`;
    element.style.top = `${touch.clientY - offsetY}px`;
    element.style.pointerEvents = 'none';
    element.style.transform = 'scale(1.05)';
    element.style.transition = 'none';
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchElement || !touchStartX || !touchStartY) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const touch = e.touches[0];
    
    // Update the element's position
    touchElement.style.left = `${touch.clientX - touchOffset.x}px`;
    touchElement.style.top = `${touch.clientY - touchOffset.y}px`;
    
    // Auto-scroll functionality
    const scrollThreshold = 60; // pixels from edge to trigger scroll
    const scrollSpeed = 15; // pixels per frame
    const viewportHeight = window.innerHeight;
    
    // Calculate distance from top and bottom edges
    const distanceFromTop = touch.clientY;
    const distanceFromBottom = viewportHeight - touch.clientY;
    
    // Auto-scroll based on touch position using requestAnimationFrame for smooth scrolling
    const scroll = () => {
      if (distanceFromTop < scrollThreshold) {
        // Scroll up
        window.scrollBy({
          top: -scrollSpeed,
          behavior: 'smooth'
        });
        requestAnimationFrame(scroll);
      } else if (distanceFromBottom < scrollThreshold) {
        // Scroll down
        window.scrollBy({
          top: scrollSpeed,
          behavior: 'smooth'
        });
        requestAnimationFrame(scroll);
      }
    };
    
    // Start smooth scrolling if within threshold
    if (distanceFromTop < scrollThreshold || distanceFromBottom < scrollThreshold) {
      requestAnimationFrame(scroll);
    }
    
    // Highlight drop zone under touch point
    const dropZoneElements = document.querySelectorAll('.drop-zone');
    dropZoneElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (
        touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom
      ) {
        // Add hover effect to indicate valid drop target
        element.classList.add('touch-hover');
      } else {
        element.classList.remove('touch-hover');
      }
    });
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchElement || !draggedItem) {
      resetTouchState();
      return;
    }
    
    // Find the drop zone element under the touch point
    const touch = e.changedTouches[0];
    const dropZoneElements = document.querySelectorAll('.drop-zone');
    let targetDropZone: Element | null = null;
    let dropIndex = -1;
    
    dropZoneElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (
        touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom
      ) {
        targetDropZone = element;
        dropIndex = index;
      }
    });
    
    // If we found a valid drop zone, handle the drop
    if (targetDropZone !== null && dropIndex !== -1) {
      handleDrop(dropIndex);
    }
    
    resetTouchState();
  };
  
  const resetTouchState = () => {
    if (touchElement) {
      // Reset the element's style
      touchElement.style.opacity = '';
      touchElement.style.zIndex = '';
      touchElement.style.position = '';
      touchElement.style.left = '';
      touchElement.style.top = '';
      touchElement.style.pointerEvents = '';
      touchElement.style.transform = '';
      touchElement.style.transition = '';
    }
    
    // Remove touch-hover class from all drop zones
    document.querySelectorAll('.drop-zone').forEach((element) => {
      element.classList.remove('touch-hover');
    });
    
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchElement(null);
    setTouchOffset({ x: 0, y: 0 });
  };
  
  // Handle touch cancel (e.g., if the user's finger leaves the screen)
  const handleTouchCancel = () => {
    resetTouchState();
    setDraggedItem(null);
  };
  
  const handleCheckAnswer = () => {
    // Check if all drop zones are filled
    const allFilled = dropZones.every(zone => zone !== null);
    if (!allFilled) {
      alert('Please place all items in the drop zones before checking your answer.');
      return;
    }
    
    // Calculate how many items are in the correct position
    let correctCount = 0;
    dropZones.forEach((item, index) => {
      if (item) {
        // Check if the item ID matches directly
        if (item.id === originalItems[index].id) {
          correctCount++;
        } 
        // Check if the items have the same image (treating them as interchangeable)
        else if (item.image && originalItems[index].image && item.image === originalItems[index].image) {
          correctCount++;
        }
      }
    });
    
    // Calculate accuracy percentage
    const accuracy = Math.round((correctCount / originalItems.length) * 100);
    setAccuracyScore(accuracy);
    setQuizCompleted(true);
  };
  
  const handleResetQuiz = () => {
    // Reset the quiz state
    const emptyDropZones = Array(items.length).fill(null);
    setDropZones(emptyDropZones);
    setQuizCompleted(false);
    setAccuracyScore(null);
    
    // Reshuffle the items
    const shuffled = shuffleArray([...items]);
    setShuffledItems(shuffled);
  };
  
  // Render simultaneous display mode
  const renderSimultaneousMode = () => (
    <>
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="memory-item">
            {item.image && <img src={item.image} alt={item.name} />}
          </div>
        ))}
      </div>
      <div className="exercise-buttons">
        <button className="quiz-button" onClick={handleStartQuiz}>
          Continue to Quiz
        </button>
      </div>
    </>
  );
  
  // Render sequential display mode
  const renderSequentialMode = () => {
    // Add a check to ensure items array is not empty
    if (items.length === 0) {
      console.log('No items available for sequential mode');
      return <div className="sequential-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading items...</div>;
    }
    
    const currentItem = items[currentItemIndex];
    console.log('Current item to display:', currentItem);
    
    return (
      <div className="sequential-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <div className="current-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', backgroundColor: 'var(--card-background)', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', minHeight: '300px' }}>
          {currentItem.image && <img src={currentItem.image} alt={currentItem.name} style={{ maxHeight: '200px' }} />}
        </div>
        
        <div className="navigation-controls">
          <button 
            className="nav-arrow" 
            onClick={handlePrevious}
            disabled={currentItemIndex === 0}
            style={{ fontSize: '1.5rem', width: '50px', height: '50px' }}
          >
            ←
          </button>
          <button 
            className="nav-arrow" 
            onClick={handleNext}
            disabled={currentItemIndex === items.length - 1}
            style={{ fontSize: '1.5rem', width: '50px', height: '50px' }}
          >
            →
          </button>
        </div>
        
        <div className="item-counter">
          {currentItemIndex + 1} / {items.length}
        </div>

        {currentItemIndex === items.length - 1 && (
          <div className="exercise-buttons">
            <button className="quiz-button" onClick={handleStartQuiz}>
              Continue to Quiz
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // Render quiz mode with drag and drop functionality
  const renderQuizMode = () => (
    <div className="quiz-container">
      <div className="navigation-header">
        <div className="navigation-buttons">
          <button
            onClick={() => onExit(false)}
            className="nav-button"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              // Reset all states and return to home page
              setIsQuizMode(false);
              setIsFinished(false);
              setQuizCompleted(false);
              setAccuracyScore(null);
              setCurrentItemIndex(0);
              setShuffledItems([]);
              setDropZones([]);
              // Reset items to ensure a clean state
              setItems([]);
              setOriginalItems([]);
              // Call onExit with true parameter to indicate home navigation
              onExit(true);
            }}
            className="nav-button"
          >
            🏠 Home
          </button>
        </div>
      </div>
      <div className="quiz-header">
        <h2>Memory Quiz</h2>
        <p>Drag and drop the items to match their original order</p>
      </div>
      
      {quizCompleted && accuracyScore !== null && (
        <div className="accuracy-score-container" style={{
          margin: '1rem 0',
          padding: '1rem',
          backgroundColor: accuracyScore === 100 ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            Accuracy Score: {accuracyScore}%
          </h3>
          <p style={{ margin: '0' }}>
            {accuracyScore === 100 
              ? 'Perfect! You remembered all items in the correct order!' 
              : `You correctly placed ${accuracyScore}% of the items. Try again to improve your score!`}
          </p>
        </div>
      )}
      
      <div className="drop-zones-container">
        {dropZones.map((item, index) => (
          <div 
            key={`dropzone-${index}`}
            className={`drop-zone ${item ? 'filled' : ''} ${quizCompleted ? (item && (item.id === originalItems[index].id || (item.image && originalItems[index].image && item.image === originalItems[index].image)) ? 'correct' : 'incorrect') : ''}`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onTouchStart={(e) => e.stopPropagation()} /* Prevent bubbling */
          >
            {item ? (
              <div 
                className="memory-item" 
                draggable={!quizCompleted}
                onDragStart={() => handleDragStart(item, index)}
                onTouchStart={(e) => !quizCompleted && handleTouchStart(e, item, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
              >
                {item.image && <img src={item.image} alt={item.name} style={{ maxHeight: '80px' }} />}
              </div>
            ) : (
              <div className="drop-zone-placeholder">Drop here</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="draggable-items-container">
        {shuffledItems.map((item, index) => {
          // Check if this item is already in a drop zone
          const isInDropZone = dropZones.some(dropItem => dropItem && dropItem.id === item.id);
          if (isInDropZone) return null;
          
          return (
            <div 
              key={`draggable-${item.id}-${index}`}
              className="draggable-item"
              draggable
              onDragStart={() => handleDragStart(item, index)}
              onTouchStart={(e) => handleTouchStart(e, item, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
            >
              {item.image && <img src={item.image} alt={item.name} />}
            </div>
          );
        })}
      </div>
      
      <div className="quiz-buttons">
        {dropZones.every(zone => zone !== null) && (
          <button 
            className="check-button" 
            onClick={handleCheckAnswer}
            disabled={quizCompleted}
          >
            Check Answer
          </button>
        )}
        {!quizCompleted && (
          <button 
            className="reset-button" 
            onClick={handleResetQuiz}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {!isQuizMode && (
        <div className="navigation-header">
          <div className="navigation-buttons">
            <button
              onClick={() => onExit(false)}
              className="nav-button"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                // Reset all states and return to home page
                setIsQuizMode(false);
                setIsFinished(false);
                setQuizCompleted(false);
                setAccuracyScore(null);
                setCurrentItemIndex(0);
                setShuffledItems([]);
                setDropZones([]);
                // Reset items to ensure a clean state
                setItems([]);
                setOriginalItems([]);
                // Call onExit with true parameter to indicate home navigation
                onExit(true);
              }}
              className="nav-button"
            >
              🏠 Home
            </button>
          </div>
        </div>
      )}
      
      <div className="exercise-container">
        <h1>Memory Exercise: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        {settings.timingMode === 'timed' && timeLeft !== null && (
          <div className="timer-display">
            Time: {timeLeft}s
          </div>
        )}
        
        {isQuizMode ? (
          renderQuizMode()
        ) : isFinished ? (
          <div className="exercise-finished">
            <h2>Exercise Complete!</h2>
            <p>You've completed the memory exercise.</p>
            <div className="exercise-buttons">
              <button className="finish-button" onClick={() => onExit(true)}>
                Return to Home
              </button>
              <button className="quiz-button" onClick={handleStartQuiz}>
                Continue to Quiz
              </button>
            </div>
          </div>
        ) : (
          <>
            {settings.displayMode === 'simultaneous' 
              ? renderSimultaneousMode() 
              : renderSequentialMode()
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Exercise;