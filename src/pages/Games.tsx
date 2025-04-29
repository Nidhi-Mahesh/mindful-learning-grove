
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Mock games data
const mockGames = [
  {
    id: 1,
    title: "Leetcode Challenge",
    category: "DSA",
    players: 32,
    difficultyLevel: "Beginner",
    shortDescription: "Practice essential DSA concepts with interactive challenges.",
    longDescription: "Strengthen your DSA fundamentals through a series of engaging quizzes and interactive problems. Progress from simple arithmetic to complex problem-solving.",
    imageClass: "bg-calm-blue-light"
  },
  {
    id: 2,
    title: "Java",
    category: "Programming",
    players: 45,
    difficultyLevel: "Intermediate",
    shortDescription: "Enhance programming skills through gamified lessons.",
    longDescription: "Improve your language skills through fun challenges that test vocabulary, grammar, and comprehension. Features adaptive difficulty that grows with you.",
    imageClass: "bg-calm-green-light"
  },
  {
    id: 3,
    title: "Python",
    category: "Programming",
    players: 27,
    difficultyLevel: "Advanced",
    shortDescription: "Discover scientific concepts through interactive experiments.",
    longDescription: "Virtual lab experiments and quizzes about physics, chemistry, and biology. Apply scientific methods to solve real-world problems and learn key concepts.",
    imageClass: "bg-calm-green-dark"
  },
  {
    id: 4,
    title: "Web Programming",
    category: "Web Programming Language",
    players: 18,
    difficultyLevel: "Intermediate",
    shortDescription: "Test your knowledge on frontend.",
    longDescription: "Play with webpages using css and js",
    imageClass: "bg-calm-brown-light"
  },
  {
    id: 5,
    title: "Memory Master",
    category: "Memory Skills",
    players: 56,
    difficultyLevel: "All Levels",
    shortDescription: "Improve memory retention through progressive challenges.",
    longDescription: "Train your memory with flashcard sequences, pattern recognition, and recall exercises. Features spaced repetition to help you remember what you learn.",
    imageClass: "bg-calm-blue-dark"
  },
  {
    id: 6,
    title: "Logic Puzzles",
    category: "Critical Thinking",
    players: 41,
    difficultyLevel: "Advanced",
    shortDescription: "Sharpen your logical reasoning with brain teasers.",
    longDescription: "Solve riddles, puzzles, and logic problems that challenge your critical thinking and problem-solving abilities. Great for developing analytical skills.",
    imageClass: "bg-calm-yellow-light"
  }
];

const GameCard = ({ game }: { game: typeof mockGames[0] }) => {
  const [showGameRoom, setShowGameRoom] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
        <div className={`h-40 ${game.imageClass}`}></div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{game.title}</CardTitle>
            <Badge variant={
              game.difficultyLevel === "Beginner" ? "outline" : 
              game.difficultyLevel === "Intermediate" ? "secondary" : 
              "default"
            }>
              {game.difficultyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{game.shortDescription}</p>
          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <span>{game.category}</span>
            <span>{game.players} players online</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setShowGameRoom(true)} className="w-full">
            Join Game
          </Button>
        </CardFooter>
      </Card>
      
      <Sheet open={showGameRoom} onOpenChange={setShowGameRoom}>
        <SheetContent className="w-[90%] sm:max-w-3xl">
          <SheetHeader>
            <SheetTitle>{game.title}</SheetTitle>
            <SheetDescription>{game.longDescription}</SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 space-y-6">
            {/* Game Interface */}
            <div className="aspect-video bg-black/5 rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-4xl">🎮</div>
                <p className="text-muted-foreground">Game content would load here</p>
                <p className="text-xs text-muted-foreground mt-2">
                  (Unity WebGL game would be embedded in this area)
                </p>
              </div>
            </div>
            
            {/* Game Rooms */}
            <div>
              <h3 className="font-medium mb-3">Available Game Rooms:</h3>
              <div className="space-y-2">
                {[1, 2, 3].map(room => (
                  <div 
                    key={room}
                    className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-medium">Room {room}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 6) + 1}/8 Players • 
                        {" "}
                        {Math.random() > 0.5 ? "In progress" : "Waiting"}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Join Room
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowGameRoom(false)}>
                Back to Lobby
              </Button>
              <Button>
                Create Room
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = ["All", "DSA", "Java", "Python", "Web Dev", "Memory Skills", "Critical Thinking"];
  
  const filteredGames = selectedCategory && selectedCategory !== "All" 
    ? mockGames.filter(game => game.category === selectedCategory)
    : mockGames;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-gradient-to-b from-calm-green-dark/30 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-medium text-center">Learning Games</h1>
            <p className="text-center text-muted-foreground mt-2">
              Enhance your knowledge and skills through interactive challenges
            </p>
          </div>
        </section>
        
        {/* Games Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map(category => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
