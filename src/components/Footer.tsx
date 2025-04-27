
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">MindfulGrove</h3>
            <p className="text-sm text-muted-foreground">
              A calm space for focused learning and mindful growth.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Pages</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/reels" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Reels
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-tutor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI Tutor
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Learning Games
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MindfulGrove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
