
import React, { useState, useRef } from 'react';
import { Play, Pause, Heart, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface VideoReelProps {
  reel: {
    id: number;
    title: string;
    creator: string;
    views: string;
    likes: number;
    videoUrl: string;
  };
}

const VideoReel = ({ reel }: VideoReelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="relative h-[100vh] w-full snap-start">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={reel.videoUrl}
        loop
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Overlay Controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <button 
            className="h-16 w-16 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition-all"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8 text-white" />
          </button>
        )}
      </div>

      {/* Right Side Controls */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-4">
        <button 
          onClick={() => setLiked(!liked)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all"
        >
          <Heart className={`w-6 h-6 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all">
              <MessageSquare className="w-6 h-6 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-black/80 backdrop-blur-sm border-gray-800 text-white">
            <div className="space-y-2">
              <h4 className="font-medium">Add Comment</h4>
              <textarea
                className="w-full h-20 bg-black/50 border border-gray-800 rounded-md p-2 text-sm text-white placeholder:text-gray-400"
                placeholder="Write a comment..."
              />
              <Button variant="outline" className="w-full">Post</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-medium text-lg">{reel.title}</h3>
        <p className="text-white/80 text-sm">{reel.creator}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/60 text-xs">{reel.views} views</span>
          <span className="text-white/60 text-xs">•</span>
          <span className="text-white/60 text-xs">{reel.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default VideoReel;

