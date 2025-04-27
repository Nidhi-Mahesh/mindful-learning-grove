
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock resources data
const mockResources = {
  books: [
    {
      id: 1, 
      title: "Atomic Habits", 
      author: "James Clear",
      rating: 4.8, 
      type: "Book", 
      description: "Learn how small changes can lead to remarkable results in your learning journey.",
      tags: ["productivity", "habits", "personal-growth"],
      aiRating: 98
    },
    {
      id: 2, 
      title: "Deep Work", 
      author: "Cal Newport",
      rating: 4.6, 
      type: "Book", 
      description: "Master the ability to focus without distraction on cognitively demanding tasks.",
      tags: ["focus", "productivity", "attention"],
      aiRating: 95
    },
    {
      id: 3, 
      title: "Make It Stick", 
      author: "Peter C. Brown",
      rating: 4.7, 
      type: "Book", 
      description: "The science of successful learning explained with practical techniques.",
      tags: ["learning", "memory", "techniques"],
      aiRating: 97
    }
  ],
  videos: [
    {
      id: 1,
      title: "How to Learn Faster",
      creator: "Ali Abdaal",
      duration: "18:24",
      views: "2.4M",
      rating: 4.9,
      type: "Video", 
      description: "Evidence-based techniques to accelerate your learning process.",
      tags: ["learning", "techniques", "productivity"],
      aiRating: 96
    },
    {
      id: 2,
      title: "The Feynman Technique",
      creator: "Thomas Frank",
      duration: "12:05",
      views: "1.8M",
      rating: 4.8,
      type: "Video", 
      description: "How to learn anything by teaching it to someone else.",
      tags: ["learning", "techniques", "explanation"],
      aiRating: 94
    },
    {
      id: 3,
      title: "Active Recall Study Techniques",
      creator: "Med School Insiders",
      duration: "15:37",
      views: "3.2M",
      rating: 4.9,
      type: "Video", 
      description: "The most effective way to study and retain information.",
      tags: ["study", "memory", "techniques"],
      aiRating: 98
    }
  ],
  courses: [
    {
      id: 1,
      title: "Learning How to Learn",
      provider: "Coursera",
      instructor: "Dr. Barbara Oakley",
      duration: "4 weeks",
      rating: 4.9,
      type: "Course", 
      description: "Powerful mental tools to help you master tough subjects.",
      tags: ["learning", "techniques", "metacognition"],
      aiRating: 99
    },
    {
      id: 2,
      title: "Mindshift: Break Through Obstacles to Learning",
      provider: "Coursera",
      instructor: "Dr. Barbara Oakley",
      duration: "4 weeks",
      rating: 4.7,
      type: "Course", 
      description: "How to overcome barriers to learning and discover your hidden potential.",
      tags: ["mindset", "career", "learning"],
      aiRating: 93
    },
    {
      id: 3,
      title: "The Science of Well-Being",
      provider: "Yale (Coursera)",
      instructor: "Laurie Santos",
      duration: "10 weeks",
      rating: 4.9,
      type: "Course", 
      description: "Psychology-based techniques for a happier, more productive life.",
      tags: ["psychology", "happiness", "productivity"],
      aiRating: 97
    }
  ]
};

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="mt-1">
              {resource.author || resource.creator || resource.instructor}
              {resource.provider && ` • ${resource.provider}`}
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {resource.aiRating}% Match
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {resource.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-3 text-sm">
          {resource.type === "Book" && (
            <div className="flex items-center gap-4">
              <span>⭐ {resource.rating}</span>
            </div>
          )}
          
          {resource.type === "Video" && (
            <div className="flex items-center gap-4">
              <span>⭐ {resource.rating}</span>
              <span>👁️ {resource.views}</span>
              <span>⏱️ {resource.duration}</span>
            </div>
          )}
          
          {resource.type === "Course" && (
            <div className="flex items-center gap-4">
              <span>⭐ {resource.rating}</span>
              <span>⏱️ {resource.duration}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setAiAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        setAiAnalyzing(false);
      }, 1500);
    }
  };

  // Get resources based on active tab
  const getFilteredResources = () => {
    if (activeTab === "all") {
      return [
        ...mockResources.books,
        ...mockResources.videos,
        ...mockResources.courses
      ].sort((a, b) => b.aiRating - a.aiRating);
    } else if (activeTab === "books") {
      return mockResources.books;
    } else if (activeTab === "videos") {
      return mockResources.videos;
    } else if (activeTab === "courses") {
      return mockResources.courses;
    }
    return [];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-calm-blue-light/30 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-medium text-center">Learning Resources</h1>
            <p className="text-center text-muted-foreground mt-2">
              AI-curated learning materials from across the web
            </p>
            
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  className="input-field w-full py-3 pl-10 pr-24"
                  placeholder="What do you want to learn about?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  🔍
                </div>
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1 bottom-1"
                  disabled={aiAnalyzing}
                >
                  {aiAnalyzing ? "Analyzing..." : "Search"}
                </Button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map(resource => (
                    <ResourceCard key={`${resource.type}-${resource.id}`} resource={resource} />
                  ))}
                </div>
                
                {getFilteredResources().length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No resources found. Try a different search.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
