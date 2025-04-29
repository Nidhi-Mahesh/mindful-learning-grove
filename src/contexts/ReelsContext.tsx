
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Reel {
  id: string;
  url: string;
  type: string;
  title: string;
  createdAt: Date;
}

interface ReelsContextType {
  reels: Reel[];
  addReel: (url: string, type: string, title: string) => void;
  deleteReel: (id: string) => void;
}

const ReelsContext = createContext<ReelsContextType | undefined>(undefined);

export const ReelsProvider = ({ children }: { children: ReactNode }) => {
  const [reels, setReels] = useState<Reel[]>([]);

  const addReel = (url: string, type: string, title: string) => {
    const newReel = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      type,
      title,
      createdAt: new Date(),
    };
    setReels((prevReels) => [newReel, ...prevReels]);
  };

  const deleteReel = (id: string) => {
    setReels((prevReels) => prevReels.filter(reel => reel.id !== id));
  };

  return (
    <ReelsContext.Provider value={{ reels, addReel, deleteReel }}>
      {children}
    </ReelsContext.Provider>
  );
};

export const useReels = () => {
  const context = useContext(ReelsContext);
  
  if (context === undefined) {
    throw new Error('useReels must be used within a ReelsProvider');
  }
  
  return context;
};
