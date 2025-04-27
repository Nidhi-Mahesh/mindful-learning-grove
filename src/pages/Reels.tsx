
import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock reels data
const mockReels = [
  {
    id: 1,
    title: "The Science of Effective Learning",
    creator: "LearningLab",
    views: "245K",
    likes: 12400,
    duration: "02:45",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    thumbnail: "bg-calm-blue-light"
  },
  {
    id: 2,
    title: "Memory Techniques for Students",
    creator: "MindfulScholar",
    views: "182K",
    likes: 9300,
    duration: "03:12",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    thumbnail: "bg-calm-green-light"
  },
  {
    id: 3,
    title: "Focus Breathing Exercise",
    creator: "ZenAcademy",
    views: "97K",
    likes: 5800,
    duration: "01:45",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    thumbnail: "bg-calm-brown-light"
  },
  {
    id: 4,
    title: "Time Management Fundamentals",
    creator: "ProductivityPro",
    views: "320K",
    likes: 15700,
    duration: "04:20",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    thumbnail: "bg-calm-green-dark"
  },
  {
    id: 5,
    title: "The Growth Mindset Explained",
    creator: "PsychInsights",
    views: "275K",
    likes: 18900,
    duration: "03:50",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    thumbnail: "bg-calm-blue-dark"
  }
];

const ReelCard = ({ reel }: { reel: typeof mockReels[0] }) => {
  const [liked, setLiked] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [noteType, setNoteType] = useState<'text' | 'drawing' | 'audio'>('text');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioRecording, setAudioRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
      
      setRecordedChunks([]);
      mediaRecorder.start();
      setAudioRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setAudioRecording(false);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all mb-6">
      <div className="relative">
        <video 
          ref={videoRef}
          className="w-full h-[500px] object-cover"
          poster={`bg-${reel.thumbnail}`}
          src={reel.videoUrl}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button 
              className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
              onClick={togglePlay}
            >
              <span className="text-2xl">▶️</span>
            </button>
          </div>
        )}
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
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary">
                  <span className="text-lg">📝</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium">Take Notes</h4>
                  
                  <div className="flex space-x-2 border-b pb-2">
                    <Button 
                      variant={noteType === 'text' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setNoteType('text')}
                    >
                      Text
                    </Button>
                    <Button 
                      variant={noteType === 'drawing' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setNoteType('drawing')}
                    >
                      Drawing
                    </Button>
                    <Button 
                      variant={noteType === 'audio' ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => setNoteType('audio')}
                    >
                      Audio
                    </Button>
                  </div>
                  
                  {noteType === 'text' && (
                    <div>
                      <textarea
                        className="input-field w-full h-24 resize-none"
                        placeholder="Add your notes here..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                  
                  {noteType === 'drawing' && (
                    <div className="space-y-2">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={200}
                        className="border border-border rounded-md bg-secondary/30 w-full"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                        onMouseLeave={endDrawing}
                      ></canvas>
                      <Button size="sm" variant="outline" onClick={clearCanvas}>Clear</Button>
                    </div>
                  )}
                  
                  {noteType === 'audio' && (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        {audioRecording ? (
                          <Button size="sm" variant="outline" className="bg-destructive/10 hover:bg-destructive/20" onClick={stopRecording}>
                            Stop Recording
                          </Button>
                        ) : (
                          <Button size="sm" onClick={startRecording}>
                            Start Recording
                          </Button>
                        )}
                      </div>
                      
                      {audioUrl && (
                        <div className="mt-2">
                          <audio src={audioUrl} controls className="w-full"></audio>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button size="sm" className="mt-2">Save Note</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
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
        
        {/* Scrollable Reels */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              {mockReels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline">
                Load More Reels
              </Button>
            </div>
          </div>
        </section>
        
        {/* AI Pet Assistant */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col items-end">
            {showAI && (
              <div className="mb-4 bg-white rounded-xl shadow-lg border border-border p-4 w-64 max-w-full animate-fade-in">
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
