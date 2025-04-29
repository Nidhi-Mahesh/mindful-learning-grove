
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Define types for the game state
interface PuzzleStatus {
  puzzle1: boolean;
  puzzle2_1: boolean;
  puzzle2_2: boolean;
}

const DSALibraryQuest = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [puzzleStatus, setPuzzleStatus] = useState<PuzzleStatus>({
    puzzle1: false,
    puzzle2_1: false,
    puzzle2_2: false
  });

  // Function to award coins
  const awardCoins = (amount: number) => {
    setCoins(prev => prev + amount);
    
    // Import confetti dynamically
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }).catch(err => console.error("Couldn't load confetti:", err));
  };

  // Function to handle correct answers
  const handleCorrectAnswer = (puzzleKey: keyof PuzzleStatus) => {
    setPuzzleStatus(prev => ({
      ...prev,
      [puzzleKey]: true
    }));
    awardCoins(10);
  };

  // First room question handling
  const handleFirstQuestion = (answer: string) => {
    if (answer === 'O(n)') {
      handleCorrectAnswer('puzzle1');
      alert('Correct! You solved the First puzzle!');
    } else {
      alert('Wrong! Try again with the First puzzle!');
    }
  };

  // Second room questions handling
  const handleSecondQuestion1 = (answer: string) => {
    if (answer === 'Tree') {
      handleCorrectAnswer('puzzle2_1');
      alert('Correct! You solved the Blue scroll puzzle!');
    } else {
      alert('Wrong! Try again with the Blue scroll puzzle!');
    }
  };

  const handleSecondQuestion2 = (answer: string) => {
    if (answer === 'O(1)') {
      handleCorrectAnswer('puzzle2_2');
      alert('Correct! You solved the Pink scroll puzzle!');
    } else {
      alert('Wrong! Try again with the Pink scroll puzzle!');
    }
  };

  // Open Treasure
  const openTreasure = () => {
    awardCoins(20);
    // Display victory message
    alert('CONGRATULATIONS! You have completed the DSA Library Quest!');
    
    // More confetti for the win!
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 300,
        spread: 360,
        origin: { y: 0.5 }
      });
    }).catch(err => console.error("Couldn't load confetti:", err));
  };

  return (
    <div className="h-full flex flex-col">
      {/* HUD */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black/70 text-amber-300 py-2 px-4 rounded-full z-50 font-bold flex items-center gap-3">
        <div className="w-6 h-6 bg-amber-400 rounded-full"></div>
        <span>Coins: {coins}</span>
      </div>

      <div className="flex-grow relative bg-gradient-to-b from-purple-900 to-purple-700 p-6 rounded-lg">
        {/* First room */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {!puzzleStatus.puzzle1 ? (
            <div className="text-center">
              <div 
                className="w-12 h-12 bg-amber-400 rounded-full mx-auto mb-4 animate-spin cursor-pointer"
                onClick={() => {
                  const answer = prompt("What is the time complexity of a linear search algorithm in the worst-case scenario?\n\na) O(1)\nb) O(n)\nc) O(log n)");
                  if (answer) {
                    handleFirstQuestion(answer.trim());
                  }
                }}
              ></div>
              <p className="text-white">Click the scroll to answer the first question</p>
            </div>
          ) : !puzzleStatus.puzzle2_1 || !puzzleStatus.puzzle2_2 ? (
            <div className="grid grid-cols-2 gap-8">
              {!puzzleStatus.puzzle2_1 && (
                <div className="text-center">
                  <div 
                    className="w-12 h-12 bg-blue-400 rounded-full mx-auto mb-4 animate-spin cursor-pointer"
                    onClick={() => {
                      const answer = prompt("Which data structure is a non-linear data structure?\n\na) Array\nb) Linked List\nc) Tree");
                      if (answer) {
                        handleSecondQuestion1(answer.trim());
                      }
                    }}
                  ></div>
                  <p className="text-white">Blue scroll puzzle</p>
                </div>
              )}
              
              {!puzzleStatus.puzzle2_2 && (
                <div className="text-center">
                  <div 
                    className="w-12 h-12 bg-pink-400 rounded-full mx-auto mb-4 animate-spin cursor-pointer"
                    onClick={() => {
                      const answer = prompt("What is the time complexity of inserting an element at the beginning of a singly linked list?\n\na) O(1)\nb) O(n)\nc) O(n^2)");
                      if (answer) {
                        handleSecondQuestion2(answer.trim());
                      }
                    }}
                  ></div>
                  <p className="text-white">Pink scroll puzzle</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div 
                className="w-20 h-16 bg-amber-700 border-4 border-amber-900 rounded cursor-pointer transition-transform hover:scale-110"
                onClick={openTreasure}
              >
                <div className="w-full h-4 bg-amber-900"></div>
              </div>
              <p className="text-white mt-2">Click the treasure chest</p>
            </div>
          )}
        </div>

        {/* Game progress indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className={`w-4 h-4 rounded-full ${puzzleStatus.puzzle1 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <div className={`w-4 h-4 rounded-full ${puzzleStatus.puzzle2_1 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <div className={`w-4 h-4 rounded-full ${puzzleStatus.puzzle2_2 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        </div>
      </div>

      {/* Game instructions */}
      <div className="mt-4 p-4 bg-muted rounded-md">
        <h3 className="font-semibold mb-2">DSA Library Quest</h3>
        <p className="text-sm text-muted-foreground">
          Explore the magical library and solve DSA problems to collect coins. Click on the colored scrolls to answer questions and unlock new areas!
        </p>
      </div>
    </div>
  );
};

export default DSALibraryQuest;
