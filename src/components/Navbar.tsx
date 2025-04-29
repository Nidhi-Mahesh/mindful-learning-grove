
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

  // Function to handle the external resource link
  const handleResourceClick = (e) => {
    e.preventDefault();
    window.open('https://tangerine-otter-6291bc.netlify.app/', '_blank');
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
              <Link to="/reels/upload" className="text-foreground/80 hover:text-primary transition-colors">
                Upload Reel
              </Link>
              <a 
                href="https://tangerine-otter-6291bc.netlify.app/" 
                onClick={handleResourceClick}
                className="text-foreground/80 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resources
              </a>
              <Link to="/games" className="text-foreground/80 hover:text-primary transition-colors">
                Games
              </Link>
              <Link to="/ai-tutor" className="text-foreground/80 hover:text-primary transition-colors">
                AI Tutor
              </Link>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
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
            <Link to="/reels/upload" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Upload Reel
            </Link>
            <a 
              href="https://tangerine-otter-6291bc.netlify.app/"
              onClick={handleResourceClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resources
            </a>
            <Link to="/games" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              Games
            </Link>
            <Link to="/ai-tutor" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 transition-colors">
              AI Tutor
            </Link>
            <Link to="/login" className="w-full btn-primary mt-3">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
