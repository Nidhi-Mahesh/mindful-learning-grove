
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-grow');
    
    const reveal = () => {
      revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    // Initial check on page load
    reveal();
    
    return () => {
      window.removeEventListener('scroll', reveal);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-calm-green-light/50 to-white">
        <div className="section-container flex flex-col items-center">
          <h1 className="text-center font-medium text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight">
            Learn with focus, grow with <span className="text-primary">mindfulness</span>
          </h1>
          <p className="mt-6 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            A calm, distraction-free environment for focused learning, where knowledge meets tranquility.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button 
              className="btn-primary px-6 py-3"
              onClick={() => scrollToSection('features')}
            >
              Explore Features
            </button>
            <button 
              className="btn-outline px-6 py-3"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>
          <div className="mt-12 w-full max-w-4xl h-64 md:h-96 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="w-full h-full bg-calm-blue-light flex items-center justify-center">
              <p className="text-calm-blue-dark">App preview illustration</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium reveal">About MindfulGrove</h2>
            <div className="mt-6 h-1 w-16 bg-primary mx-auto reveal"></div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-left">
              <div className="h-64 bg-calm-brown-light rounded-xl flex items-center justify-center">
                <p className="text-calm-brown-dark">Illustration</p>
              </div>
            </div>
            <div className="flex flex-col justify-center reveal-right">
              <h3 className="text-2xl font-medium">Our Mission</h3>
              <p className="mt-4 text-muted-foreground">
                MindfulGrove was created to provide a peaceful learning environment 
                that respects your focus and mental wellbeing. In a world full of 
                distractions, we've designed a space where your learning journey 
                can flourish without the mental fatigue that comes from overstimulation.
              </p>
              <p className="mt-4 text-muted-foreground">
                We believe learning should be a calm, mindful experience that nurtures 
                both intellectual growth and mental wellbeing.
              </p>
            </div>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center order-2 md:order-1 reveal-left">
              <h3 className="text-2xl font-medium">Our Approach</h3>
              <p className="mt-4 text-muted-foreground">
                Every feature in MindfulGrove is designed with intention. From our 
                soft color palette that reduces eye strain to our Pomodoro timers 
                that encourage healthy work-rest cycles, we're committed to helping 
                you learn effectively while maintaining mental balance.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our content is curated to promote deep understanding rather than 
                information overload, and our AI assistants are designed to be 
                helpful companions rather than distractions.
              </p>
            </div>
            <div className="order-1 md:order-2 reveal-right">
              <div className="h-64 bg-calm-green-light rounded-xl flex items-center justify-center">
                <p className="text-calm-green-dark">Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium reveal">Key Features</h2>
            <p className="mt-6 text-muted-foreground reveal">
              Designed to create a harmonious balance between focused learning and mindful breaks.
            </p>
            <div className="mt-6 h-1 w-16 bg-primary mx-auto reveal"></div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Educational Reels",
                description: "Bite-sized learning content optimized for retention, with seamless note-taking capabilities.",
                icon: "📱"
              },
              {
                title: "Pomodoro Growth",
                description: "Watch your focus sessions grow virtual trees, creating a visual representation of your dedication.",
                icon: "🌱"
              },
              {
                title: "AI Companions",
                description: "Gentle AI tutors that assist your learning journey without overwhelming or distracting you.",
                icon: "🤖"
              },
              {
                title: "Resource Hub",
                description: "AI-curated learning materials sourced from quality online resources, tailored to your interests.",
                icon: "📚"
              },
              {
                title: "Mindful Timers",
                description: "Built-in meditation, focus, and rest timers to help maintain a balanced learning rhythm.",
                icon: "⏱️"
              },
              {
                title: "Learning Games",
                description: "Interactive challenges that reinforce knowledge through enjoyable, low-pressure activities.",
                icon: "🎮"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="calm-card flex flex-col items-center text-center p-8 reveal-grow"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
                <p className="mt-4 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Login/Signup Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-left">
              <h2 className="text-3xl font-medium">Join Our Community</h2>
              <p className="mt-6 text-muted-foreground">
                Create an account to save your progress, sync across devices, and 
                unlock personalized features tailored to your learning style.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-calm-green-light flex items-center justify-center">
                    <span className="text-calm-green-dark">✓</span>
                  </div>
                  <p className="ml-4 text-foreground">Personalized learning recommendations</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-calm-green-light flex items-center justify-center">
                    <span className="text-calm-green-dark">✓</span>
                  </div>
                  <p className="ml-4 text-foreground">Save notes and progress across devices</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-calm-green-light flex items-center justify-center">
                    <span className="text-calm-green-dark">✓</span>
                  </div>
                  <p className="ml-4 text-foreground">Unlock advanced Pomodoro features</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-calm-green-light flex items-center justify-center">
                    <span className="text-calm-green-dark">✓</span>
                  </div>
                  <p className="ml-4 text-foreground">Join learning circles with like-minded peers</p>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <div className="bg-white rounded-xl shadow-sm border border-border p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-center">Create Account</h3>
                    <div className="mt-2 h-1 w-12 bg-primary mx-auto"></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input-field"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="input-field"
                        placeholder="Create a password"
                      />
                    </div>
                    <button className="w-full btn-primary py-2">
                      Sign Up
                    </button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <a href="#" className="text-primary hover:underline">
                          Log in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="section-container text-center">
          <h2 className="text-3xl font-medium reveal">Ready to start your mindful learning journey?</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto reveal">
            Join thousands of learners who've discovered the peace and focus that comes with mindful education.
          </p>
          <button className="mt-10 btn-primary px-8 py-3 text-lg reveal">
            Get Started Today
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
