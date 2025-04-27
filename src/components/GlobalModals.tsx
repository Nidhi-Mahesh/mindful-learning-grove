
import React, { useState } from 'react';
import TimerModal from './TimerModals';

const GlobalModals = () => {
  const [activeModal, setActiveModal] = useState<'pomodoro' | 'meditation' | 'nap' | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      {/* Fixed Float Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative group">
          <button className="h-12 w-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white">
            <span>⏱️</span>
          </button>
          
          <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border flex flex-col w-40">
              <button 
                className="py-2 px-4 text-left hover:bg-secondary/50 flex items-center transition-colors"
                onClick={() => setActiveModal('pomodoro')}
              >
                <span className="mr-2">🍅</span> Pomodoro
              </button>
              <button 
                className="py-2 px-4 text-left hover:bg-secondary/50 flex items-center transition-colors"
                onClick={() => setActiveModal('meditation')}
              >
                <span className="mr-2">🧘</span> Meditation
              </button>
              <button 
                className="py-2 px-4 text-left hover:bg-secondary/50 flex items-center transition-colors"
                onClick={() => setActiveModal('nap')}
              >
                <span className="mr-2">😴</span> Power Nap
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timer Modals */}
      <TimerModal 
        type="pomodoro" 
        isOpen={activeModal === 'pomodoro'} 
        onClose={closeModal} 
      />
      <TimerModal 
        type="meditation" 
        isOpen={activeModal === 'meditation'} 
        onClose={closeModal} 
      />
      <TimerModal 
        type="nap" 
        isOpen={activeModal === 'nap'} 
        onClose={closeModal} 
      />
    </>
  );
};

export default GlobalModals;
