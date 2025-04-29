import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, StopCircle } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReels } from '@/contexts/ReelsContext';

// Interfaces
interface VideoAnalysis {
  isEducational: boolean;
  topics: string[];
}

export default function Upload() {
  const { addReel } = useReels();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera or microphone.");
    }
  };

  // Start Recording
  const startRecording = () => {
    if (!cameraStream) return;

    chunksRef.current = [];
    const recorder = new MediaRecorder(cameraStream, { mimeType: "video/webm;codecs=vp8,opus" });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    toast.success("Recording started!");
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped!");
    }
  };

  // Upload
  const handleUpload = async () => {
    if (videoUrl) {
      try {
        setIsLoading(true);
        addReel(videoUrl, 'video', 'Recorded Video');
        toast.success("Video uploaded successfully!");
        navigate('/reels');
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload video.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Re-record
  const handleReRecord = () => {
    // Clean up previous recording
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl("");
    startCamera(); // Restart camera
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Create New Content</h2>
            
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {cameraStream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : videoUrl ? (
                  <div className="relative">
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                    <Button 
                      onClick={handleReRecord}
                      variant="secondary"
                      className="absolute top-4 right-4"
                    >
                      Record Again
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Button onClick={startCamera}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  </div>
                )}
              </div>

              {isRecording && (
                <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Recording
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              {!cameraStream && (
                <Button onClick={startCamera} size="lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              )}
              {cameraStream && !isRecording && !videoUrl && (
                <Button onClick={startRecording} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Recording
                </Button>
              )}
              {isRecording && (
                <Button onClick={stopRecording} size="lg" variant="destructive">
                  <StopCircle className="mr-2 h-5 w-5" />
                  Stop Recording
                </Button>
              )}
              {videoUrl && (
                <>
                  <Button onClick={handleUpload} size="lg" className="bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Video'}
                  </Button>
                  <Button onClick={handleReRecord} size="lg" variant="secondary">
                    Record Again
                  </Button>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
