
import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReelUpload = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reelInfo, setReelInfo] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error("Please upload a video file");
        return;
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size should be less than 100MB");
        return;
      }
      
      setPreviewFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate upload process
    if (previewFile) {
      simulateFileUpload();
    } else if (youtubeLink) {
      simulateLinkProcessing();
    } else {
      toast.error("Please provide a video file or YouTube link");
    }
  };

  const simulateFileUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success("Reel uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const simulateLinkProcessing = () => {
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success("YouTube reel processed successfully!");
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-b from-calm-blue-light/30 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-medium text-center">Upload Your Reel</h1>
            <p className="text-center text-muted-foreground mt-2">
              Share your knowledge with the community through educational reels
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {previewUrl ? (
                      <div className="space-y-4">
                        <video 
                          src={previewUrl} 
                          controls 
                          className="mx-auto max-h-64 rounded-lg"
                        ></video>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setPreviewFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          Remove Video
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="space-y-4 cursor-pointer"
                        onClick={triggerFileInput}
                      >
                        <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-3xl">📤</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Drag & drop or click to upload</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Supported formats: MP4, MOV, WebM (Max 100MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="video/*" 
                      onChange={handleFileChange} 
                      ref={fileInputRef}
                    />
                  </div>
                  
                  {/* YouTube Link */}
                  <div>
                    <h3 className="font-medium mb-2">Or paste YouTube link</h3>
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder="https://youtube.com/watch?v=..."
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                  </div>
                  
                  {/* Reel Info */}
                  <div className="space-y-4 pt-2 border-t border-border">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="input-field w-full"
                        placeholder="Enter a descriptive title"
                        value={reelInfo.title}
                        onChange={(e) => setReelInfo({...reelInfo, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="input-field w-full h-24 resize-none"
                        placeholder="Describe what your reel is about..."
                        value={reelInfo.description}
                        onChange={(e) => setReelInfo({...reelInfo, description: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium mb-1">
                        Tags
                      </label>
                      <input
                        id="tags"
                        type="text"
                        className="input-field w-full"
                        placeholder="education, learning, science, etc."
                        value={reelInfo.tags}
                        onChange={(e) => setReelInfo({...reelInfo, tags: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  {/* Upload Progress */}
                  {uploading && (
                    <div className="space-y-2">
                      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300" 
                          style={{width: `${uploadProgress}%`}}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        {uploadProgress < 100 ? 'Processing...' : 'Complete!'}
                      </p>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={uploading || (!previewFile && !youtubeLink)}
                    >
                      {uploading ? 'Uploading...' : 'Upload Reel'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReelUpload;
