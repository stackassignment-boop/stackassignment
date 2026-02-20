'use client';

import { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Moon, Sun, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

// Get initial theme
function getInitialTheme(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? saved === 'dark' : prefersDark;
  }
  return false;
}

export default function Header({ currentPage = 'home', onNavigate }: HeaderProps) {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'samples', label: 'Samples' },
    { id: 'blog', label: 'Blog' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-lg sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
          >
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Stack Assignment
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="tel:+919126943297"
              className="hidden sm:flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Phone className="w-4 h-4" /> +91-91269-43297
            </a>

            <Button
              onClick={() => handleNav('order')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Order Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg border-t dark:border-slate-700">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentPage === item.id ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
