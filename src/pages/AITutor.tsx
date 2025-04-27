
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

const AITutor = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{role: "user" | "tutor", content: string}[]>([
    {role: "tutor", content: "Hello! I'm your AI tutor. How can I help you with your learning today?"}
  ]);
  const [activeSubject, setActiveSubject] = useState("mathematics");
  
  const subjects = [
    { id: "mathematics", name: "Mathematics", icon: "➗" },
    { id: "science", name: "Science", icon: "🧪" },
    { id: "languages", name: "Languages", icon: "🗣️" },
    { id: "humanities", name: "Humanities", icon: "📚" },
    { id: "art", name: "Art & Design", icon: "🎨" },
  ];

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChat([...chat, {role: "user", content: message}]);
    setMessage("");
    
    // Simulate tutor response
    setTimeout(() => {
      let response = "";
      if (message.toLowerCase().includes("help")) {
        response = "I'd be happy to help! Could you elaborate on what you're struggling with?";
      } else if (message.toLowerCase().includes("math") || message.toLowerCase().includes("equation")) {
        response = "Mathematics is my specialty! Let's break this problem down step by step. What specific concept are you working on?";
      } else if (message.toLowerCase().includes("recommend")) {
        response = "Based on your learning profile, I'd recommend starting with foundational concepts before moving to more advanced topics. Would you like me to create a learning path for you?";
      } else {
        response = "That's an interesting question. Let me guide you through this concept clearly. What's your current understanding of this topic?";
      }
      
      setChat(prev => [...prev, {role: "tutor", content: response}]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-gradient-to-b from-calm-blue-dark/30 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-medium text-center">AI Tutor</h1>
            <p className="text-center text-muted-foreground mt-2">
              Your personalized learning assistant
            </p>
          </div>
        </section>
        
        {/* Tutor Interface */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Modules</CardTitle>
                    <CardDescription>Choose your subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {subjects.map(subject => (
                        <button
                          key={subject.id}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                            activeSubject === subject.id 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-secondary"
                          }`}
                          onClick={() => setActiveSubject(subject.id)}
                        >
                          <span className="text-xl">{subject.icon}</span>
                          <span>{subject.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Browse All Subjects
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Sessions Completed</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-primary w-1/2"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Questions Asked</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-primary w-3/4"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Knowledge Growth</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-primary w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>Interactive Tutor</CardTitle>
                  </CardHeader>
                  
                  <Tabs defaultValue="chat" className="flex flex-col flex-grow">
                    <div className="px-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="hologram">Holographic Tutor</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="chat" className="flex-grow flex flex-col px-6 mt-0">
                      {/* Chat Messages */}
                      <div className="flex-grow p-4 bg-secondary/20 rounded-lg mb-4 overflow-y-auto max-h-[400px]">
                        <div className="space-y-4">
                          {chat.map((msg, i) => (
                            <div 
                              key={i}
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  msg.role === "user" 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-white border border-border"
                                }`}
                              >
                                {msg.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Message Input */}
                      <form onSubmit={sendMessage} className="mt-auto pb-4">
                        <div className="relative">
                          <input
                            type="text"
                            className="input-field w-full pr-24"
                            placeholder="Ask your question..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <Button 
                            type="submit" 
                            className="absolute right-1 top-1 bottom-1"
                            disabled={!message.trim()}
                          >
                            Send
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="hologram" className="flex-grow px-6 mt-0">
                      <div className="h-full min-h-[400px] flex items-center justify-center bg-black/5 rounded-lg border border-border">
                        <div className="text-center p-6">
                          <div className="mb-4 text-5xl">👩‍🏫</div>
                          <h3 className="text-lg font-medium">Holographic Tutor</h3>
                          <p className="text-muted-foreground mt-2 max-w-md">
                            The 3D holographic tutor would appear here. The Unity WebGL interface would allow for interactive learning with a virtual teacher.
                          </p>
                          <Button className="mt-4">
                            Launch Holographic Interface
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AITutor;
