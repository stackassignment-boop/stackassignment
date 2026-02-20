'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  
  // Use useLayoutEffect or just track mount state differently
  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <section className="relative text-white py-28 md:py-40 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(30,41,59,0.94), rgba(15,23,42,0.97)), url(https://picsum.photos/id/1015/1920/1080)'
        }}
      />
      
      {/* Floating Brain SVG Icons */}
      {mounted && (
        <>
          <FloatingBrain delay={0} style={{ top: '10%', left: '5%', width: '280px', height: '280px' }} />
          <FloatingBrain delay={7} style={{ top: '60%', right: '8%', width: '220px', height: '220px' }} />
          <FloatingBrain delay={14} style={{ bottom: '15%', left: '12%', width: '200px', height: '200px' }} />
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Mini stats in hero */}
        <div className="flex flex-wrap justify-center mb-8 gap-3">
          <HeroMiniStat icon="users" text="60,000+ Students" delay={0.2} />
          <HeroMiniStat icon="check-circle" text="98% Success Rate" delay={0.4} />
          <HeroMiniStat icon="clock" text="24/7 Support" delay={0.6} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
          Expert Academic Writing<br />Since 2010
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90 font-medium">
          Guiding Students to Excellence for Over a Decade
        </p>
        
        <p className="text-lg mb-12 max-w-2xl mx-auto text-white/75">
          PhD-qualified writers · 100% original · On-time delivery · Money-back guarantee
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Button
            onClick={() => handleNav('order')}
            className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-6 rounded-xl text-xl font-bold transition shadow-lg"
          >
            Get Quote in 60 Seconds →
          </Button>
          <Button
            onClick={() => handleNav('samples')}
            variant="outline"
            className="border-2 border-white/70 hover:bg-white/15 px-10 py-6 rounded-xl text-xl font-semibold transition"
          >
            View Samples
          </Button>
        </div>
      </div>
    </section>
  );
}

// Floating Brain Component
function FloatingBrain({ delay, style }: { delay: number; style: React.CSSProperties }) {
  return (
    <svg 
      className="absolute opacity-[0.08] pointer-events-none"
      style={{
        ...style,
        animation: `float 20s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      fill="currentColor"
    >
      <path d="M184 0c30.9 0 56 25.1 56 56V456c0 30.9-25.1 56-56 56c-28.9 0-52.7-21.9-55.7-50.1c-5.2 1.4-10.7 2.1-16.3 2.1c-35.3 0-64-28.7-64-64c0-7.4 1.3-14.6 3.6-21.2C21.4 367.4 0 338.2 0 304c0-31.9 18.7-59.5 45.8-72.3C37.1 220.8 32 207 32 192c0-30.7 21.6-56.3 50.4-62.6C80.8 123.9 80 118 80 112c0-29.9 20.6-55.1 48.3-62.1C131.3 21.9 155.1 0 184 0zM328 0c28.9 0 52.6 21.9 55.7 49.9c27.8 7 48.3 32.1 48.3 62.1c0 6-.8 11.9-2.4 17.4c28.8 6.2 50.4 31.9 50.4 62.6c0 15-5.1 28.8-13.8 39.7C493.3 244.5 512 272.1 512 304c0 34.2-21.4 63.4-51.6 74.8c2.3 6.6 3.6 13.8 3.6 21.2c0 35.3-28.7 64-64 64c-5.6 0-11.1-.7-16.3-2.1c-3 28.2-26.8 50.1-55.7 50.1c-30.9 0-56-25.1-56-56V56c0-30.9 25.1-56 56-56z"/>
    </svg>
  );
}

// Hero Mini Stat Component
function HeroMiniStat({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    'users': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-4 h-4">
        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320H235.4c26.5-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C423.2 192 471 239.8 471 298.7c0 11.8-9.6 21.3-21.3 21.3H448 405.3zM416 224a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM128 485.3C128 411.7 187.7 352 261.3 352H390.7C464.3 352 524 411.7 524 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
      </svg>
    ),
    'check-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
      </svg>
    ),
    'clock': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
      </svg>
    ),
  };

  return (
    <div 
      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3 text-sm font-bold"
      style={{
        animation: 'fadeSlideUp 0.8s ease forwards',
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
        {iconMap[icon]}
      </div>
      <span>{text}</span>
    </div>
  );
}
