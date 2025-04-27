import React from 'react';
import VideoReel from '../components/VideoReel';

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

const Reels = () => {
  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      <div className="h-full overflow-y-scroll snap-y snap-mandatory">
        {mockReels.map((reel) => (
          <VideoReel key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
};

export default Reels;
