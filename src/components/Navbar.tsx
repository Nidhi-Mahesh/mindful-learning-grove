
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-medium text-calm-green-dark">
              MindfulGrove
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
                Profile
              </Link>
              <Link to="/reels" className="text-foreground/80 hover:text-primary transition-colors">
                Reels
              </Link>
              <Link to="/reelsupload" className="text-foreground/80 hover:text-primary transition-colors">
                Reels Upload
              </Link>
              <Link to="/resources" className="text-foreground/80 hover:text-primary transition-colors">
                Resources
              </Link>
              <Link to="/games" className="text-foreground/80 hover:text-primary transition-colors">
                Games
              </Link>
              <Link to="/ai-tutor" className="text-foreground/80 hover:text-primary transition-colors">
                AI Tutor
              </Link>
              <button className="btn-primary">
                Login
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Home
            </Link>
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Profile
            </Link>
            <Link to="/reels" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Reels
            </Link>
            <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Resources
            </Link>
            <Link to="/games" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Games
            </Link>
            <Link to="/ai-tutor" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              AI Tutor
            </Link>
            <button className="w-full btn-primary mt-3">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
