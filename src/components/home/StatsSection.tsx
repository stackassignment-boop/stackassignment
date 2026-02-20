'use client';

import { useState, useEffect, useRef } from 'react';

interface Stat {
  icon: string;
  target: number;
  label: string;
  sub: string;
  suffix?: string;
}

const stats: Stat[] = [
  { icon: 'graduate', target: 60000, label: 'Happy Students', sub: 'Students worldwide trust our expertise', suffix: '+' },
  { icon: 'file', target: 160000, label: 'Papers Delivered', sub: 'Quality assignments completed successfully', suffix: '+' },
  { icon: 'chalkboard', target: 437, label: 'Expert Writers', sub: 'PhD-qualified writers available 24/7' },
  { icon: 'chart', target: 98, label: 'Success Rate', sub: 'Client satisfaction guaranteed', suffix: '%' },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)'
      }}
    >
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-semibold text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-3.3 16.4 7.4 32.5 23.8 35.8s32.5-7.4 35.8-23.8l2.3-11.4c10.5-52.5-23.7-104.2-76.2-114.7S230.1 10.2 219.6 62.7l-2.3 11.4c-3.3 16.4 7.4 32.5 23.8 35.8s32.5-7.4 35.8-23.8l2.3-11.4c5.2-26-11.7-51.3-37.7-56.5z"/>
              <path d="M164.4 194.7c-16.4 3.3-27.1 19.4-23.8 35.8l11.4 57.1c3.3 16.4 19.4 27.1 35.8 23.8s27.1-19.4 23.8-35.8l-11.4-57.1c-3.3-16.4-19.4-27.1-35.8-23.8z"/>
              <path d="M474.5 234.7c-26-5.2-51.3 11.7-56.5 37.7l-11.4 57.1c-3.3 16.4 7.4 32.5 23.8 35.8s32.5-7.4 35.8-23.8l11.4-57.1c5.2-26 30.5-42.9 56.5-37.7z"/>
              <path d="M258.6 368.6c-16.4 3.3-27.1 19.4-23.8 35.8l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7s42.9-30.5 37.7-56.5l-2.3-11.4c-3.3-16.4-19.4-27.1-35.8-23.8z"/>
            </svg>
            Proven Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Numbers That Speak<br />Our Success
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto text-lg">
            Join thousands of satisfied students who have achieved academic excellence with our professional writing services.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              isVisible={isVisible} 
              delay={(index + 1) * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, isVisible, delay }: { stat: Stat; isVisible: boolean; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        current = stat.target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.target]);

  const iconMap: Record<string, React.ReactNode> = {
    'graduate': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-8 h-8">
        <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9V320c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.5 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L512 256.9 343.7 317.1c-7.6 2.7-15.6 4.1-23.7 4.1s-16.1-1.4-23.7-4.1L128 256.9V408z"/>
      </svg>
    ),
    'file': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
      </svg>
    ),
    'chalkboard': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-8 h-8">
        <path d="M192 96c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zM64 160c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm0 128c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm0 128c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"/>
      </svg>
    ),
    'chart': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8">
        <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
      </svg>
    ),
  };

  return (
    <div 
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
      style={{
        animation: isVisible ? `fadeSlideUp 0.6s ease forwards` : 'none',
        animationDelay: `${delay}s`,
        opacity: isVisible ? 0 : 1
      }}
    >
      {/* Pulse effect */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite'
        }}
      />
      
      <div className="w-[70px] h-[70px] bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white relative z-10">
        {iconMap[stat.icon]}
      </div>
      
      <div className="text-4xl md:text-5xl font-extrabold text-white leading-none relative z-10" style={{ fontFamily: 'Sora, sans-serif' }}>
        {count.toLocaleString('en-IN')}{stat.suffix}
      </div>
      
      <div className="text-lg font-semibold text-white/95 mt-2 relative z-10">
        {stat.label}
      </div>
      
      <div className="text-sm text-white/60 mt-2 relative z-10">
        {stat.sub}
      </div>
    </div>
  );
}
