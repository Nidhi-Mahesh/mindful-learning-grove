
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    level: 24,
    experience: 75, // percentage
    savedReels: [
      { id: 1, title: 'Introduction to Mindfulness', thumbnail: 'bg-calm-blue-light' },
      { id: 2, title: 'Effective Study Techniques', thumbnail: 'bg-calm-green-light' },
      { id: 3, title: 'Memory Improvement Hacks', thumbnail: 'bg-calm-brown-light' },
      { id: 4, title: 'Focus and Concentration', thumbnail: 'bg-calm-green-light' },
      { id: 5, title: 'Learning Efficiency', thumbnail: 'bg-calm-blue-light' },
      { id: 6, title: 'Growth Mindset Explained', thumbnail: 'bg-calm-brown-light' },
    ],
    savedNotes: [
      { id: 1, title: 'Mindfulness Session Notes', type: 'text', preview: 'Focus on breathing techniques and...' },
      { id: 2, title: 'Study Plan for Economics', type: 'text', preview: 'Chapter 1-3 by Wednesday, practice...' },
      { id: 3, title: 'Mind Map: Psychology Concepts', type: 'drawing', preview: 'bg-calm-blue-light' },
      { id: 4, title: 'Lecture Recording: Calculus', type: 'voice', preview: '03:24' },
      { id: 5, title: 'Language Learning Strategy', type: 'text', preview: 'Daily practice schedule and resource list...' },
    ],
    trees: [
      { id: 1, name: 'Oak', level: 3, sessions: 15 },
      { id: 2, name: 'Maple', level: 2, sessions: 8 },
      { id: 3, name: 'Pine', level: 1, sessions: 4 },
      { id: 4, name: 'Cherry', level: 0, sessions: 0 }
    ],
    stats: {
      followers: 42,
      following: 38,
      likes: 156,
      streakDays: 7
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* User Header */}
        <section className="bg-gradient-to-b from-calm-blue-light/50 to-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-28 h-28 rounded-full bg-calm-green overflow-hidden flex items-center justify-center border-4 border-white shadow-md">
                <span className="text-white text-2xl font-medium">AJ</span>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl font-medium">{userData.name}</h1>
                <p className="text-muted-foreground mt-1">Level {userData.level} Learner</p>
                
                <div className="mt-4 flex flex-wrap gap-6 justify-center md:justify-start">
                  <div className="text-center">
                    <p className="text-lg font-medium">{userData.stats.followers}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">{userData.stats.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">{userData.stats.likes}</p>
                    <p className="text-sm text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">{userData.stats.streakDays} days</p>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <button className="btn-outline">Edit Profile</button>
                <button className="btn-secondary">Share Profile</button>
              </div>
            </div>
            
            {/* Experience Bar */}
            <div className="mt-8 max-w-md mx-auto md:mx-0 md:ml-36">
              <div className="flex justify-between text-sm mb-1">
                <span>Level {userData.level}</span>
                <span>Level {userData.level + 1}</span>
              </div>
              <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${userData.experience}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">{userData.experience}% complete</p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Saved Reels */}
                <div className="calm-card">
                  <h2 className="text-xl font-medium mb-6">Saved Reels</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.savedReels.map((reel) => (
                      <div key={reel.id} className="rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all">
                        <div className={`h-32 ${reel.thumbnail} flex items-center justify-center`}>
                          <span>▶️</span>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium line-clamp-2">{reel.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-primary text-sm hover:underline">View All Reels</button>
                  </div>
                </div>
                
                {/* Saved Notes */}
                <div className="calm-card">
                  <h2 className="text-xl font-medium mb-6">Saved Notes</h2>
                  <div className="space-y-3">
                    {userData.savedNotes.map((note) => (
                      <div key={note.id} className="flex items-start p-3 rounded-lg border border-border hover:bg-secondary/20 transition-all">
                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                          {note.type === 'text' && <span>📝</span>}
                          {note.type === 'drawing' && <span>🎨</span>}
                          {note.type === 'voice' && <span>🎤</span>}
                        </div>
                        <div className="ml-3 flex-grow">
                          <h3 className="text-sm font-medium">{note.title}</h3>
                          {note.type === 'text' && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{note.preview}</p>
                          )}
                          {note.type === 'drawing' && (
                            <div className="mt-1 h-8 w-24 rounded-sm overflow-hidden">
                              <div className={`h-full w-full ${note.preview}`}></div>
                            </div>
                          )}
                          {note.type === 'voice' && (
                            <p className="text-xs text-muted-foreground mt-1">Duration: {note.preview}</p>
                          )}
                        </div>
                        <button className="text-muted-foreground hover:text-primary ml-2">
                          <span>⋮</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <button className="text-primary text-sm hover:underline">View All Notes</button>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-8">
                {/* Pomodoro Trees */}
                <div className="calm-card">
                  <h2 className="text-xl font-medium mb-6">Pomodoro Forest</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {userData.trees.map((tree) => (
                      <div key={tree.id} className="text-center">
                        <div className="h-28 flex items-end justify-center">
                          {tree.level === 0 && (
                            <div className="w-8 h-8 rounded-full bg-calm-brown-light border-2 border-calm-brown flex items-center justify-center">
                              <span className="text-xs">🌱</span>
                            </div>
                          )}
                          {tree.level === 1 && (
                            <div className="w-6 h-20 flex flex-col items-center">
                              <div className="w-12 h-12 bg-calm-green-light rounded-full flex items-center justify-center">
                                <span>🌿</span>
                              </div>
                              <div className="w-2 h-8 bg-calm-brown"></div>
                            </div>
                          )}
                          {tree.level === 2 && (
                            <div className="w-8 h-24 flex flex-col items-center">
                              <div className="w-16 h-16 bg-calm-green rounded-full flex items-center justify-center">
                                <span>🌲</span>
                              </div>
                              <div className="w-3 h-8 bg-calm-brown-dark"></div>
                            </div>
                          )}
                          {tree.level === 3 && (
                            <div className="w-10 h-28 flex flex-col items-center">
                              <div className="w-20 h-20 bg-calm-green-dark rounded-full flex items-center justify-center">
                                <span>🌳</span>
                              </div>
                              <div className="w-4 h-8 bg-calm-brown-dark"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium mt-2">{tree.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tree.sessions} session{tree.sessions !== 1 ? 's' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full btn-primary mt-6">Start New Pomodoro</button>
                </div>
                
                {/* Activity Stats */}
                <div className="calm-card">
                  <h2 className="text-xl font-medium mb-6">Weekly Activity</h2>
                  <div className="flex justify-between space-x-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full bg-secondary/50 rounded-sm" style={{ 
                          height: `${Math.max(15, Math.floor(Math.random() * 60))}px`,
                          opacity: index < 5 ? 1 : 0.5
                        }}></div>
                        <span className="text-xs mt-1">{day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span>Total Focus Time</span>
                      <span className="font-medium">12h 45m</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Completed Sessions</span>
                      <span className="font-medium">27</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Streak</span>
                      <span className="font-medium">7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
