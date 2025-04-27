
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock reels data
const mockReels = [
  {
    id: 1,
    title: "The Science of Effective Learning",
    creator: "LearningLab",
    views: "245K",
    likes: 12400,
    duration: "02:45",
    thumbnail: "bg-calm-blue-light"
  },
  {
    id: 2,
    title: "Memory Techniques for Students",
    creator: "MindfulScholar",
    views: "182K",
    likes: 9300,
    duration: "03:12",
    thumbnail: "bg-calm-green-light"
  },
  {
    id: 3,
    title: "Focus Breathing Exercise",
    creator: "ZenAcademy",
    views: "97K",
    likes: 5800,
    duration: "01:45",
    thumbnail: "bg-calm-brown-light"
  },
  {
    id: 4,
    title: "Time Management Fundamentals",
    creator: "ProductivityPro",
    views: "320K",
    likes: 15700,
    duration: "04:20",
    thumbnail: "bg-calm-green-dark"
  },
  {
    id: 5,
    title: "The Growth Mindset Explained",
    creator: "PsychInsights",
    views: "275K",
    likes: 18900,
    duration: "03:50",
    thumbnail: "bg-calm-blue-dark"
  }
];

const ReelCard = ({ reel }: { reel: typeof mockReels[0] }) => {
  const [liked, setLiked] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all">
      <div className={`h-56 ${reel.thumbnail} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all">
            <span className="text-2xl">▶️</span>
          </button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {reel.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground">{reel.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{reel.creator}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-muted-foreground">
            {reel.views} views
          </div>
          <div className="flex space-x-3">
            <button 
              className={`flex items-center space-x-1 ${liked ? 'text-destructive' : 'text-muted-foreground'}`}
              onClick={() => setLiked(!liked)}
            >
              <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
              <span className="text-xs">{liked ? reel.likes + 1 : reel.likes}</span>
            </button>
            <button 
              className={`flex items-center space-x-1 ${noteOpen ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setNoteOpen(!noteOpen)}
            >
              <span className="text-lg">📝</span>
            </button>
          </div>
        </div>
        
        {/* Simple Note Panel */}
        {noteOpen && (
          <div className="mt-3 pt-3 border-t border-border animate-fade-in">
            <textarea
              className="input-field w-full h-24 resize-none"
              placeholder="Add your notes here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="flex justify-between mt-2">
              <div className="flex space-x-2">
                <button className="text-muted-foreground hover:text-primary">
                  <span>🎤</span>
                </button>
                <button className="text-muted-foreground hover:text-primary">
                  <span>🎨</span>
                </button>
              </div>
              <button className="btn-primary text-xs px-3 py-1">
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Reels = () => {
  const [query, setQuery] = useState("");
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-calm-green-light/50 to-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-medium text-center">Educational Reels</h1>
            <p className="text-center text-muted-foreground mt-2">
              Bite-sized learning content to expand your knowledge
            </p>
            <div className="mt-6 max-w-xl mx-auto relative">
              <input
                type="text"
                className="input-field w-full py-3 pl-10 pr-4"
                placeholder="Search for topics, skills, or creators..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                🔍
              </div>
            </div>
          </div>
        </section>
        
        {/* Reels Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockReels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <button className="btn-outline">
                Load More Reels
              </button>
            </div>
          </div>
        </section>
        
        {/* AI Pet Assistant */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col items-end">
            {showAI && (
              <div className="mb-4 bg-white rounded-xl shadow-lg border border-border p-4 w-64 max-w-full animate-slide-up">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Learning Assistant</h3>
                  <button 
                    onClick={() => setShowAI(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-secondary/40 rounded-lg p-3 mb-3">
                  <p className="text-sm">
                    Hi there! I'm your learning assistant. Ask me anything about the content you're watching.
                  </p>
                </div>
                <input
                  type="text"
                  className="input-field w-full text-sm"
                  placeholder="Ask a question..."
                />
              </div>
            )}
            <button 
              className="h-12 w-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-all"
              onClick={() => setShowAI(!showAI)}
            >
              <span>{showAI ? '✕' : '🐾'}</span>
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reels;
