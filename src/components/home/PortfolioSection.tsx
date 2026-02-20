'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PortfolioItem {
  id: number;
  category: string;
  image: string;
  bannerColor: string;
  subject: string;
  subjectColor: string;
  pages: number;
  title: string;
  description: string;
  tags: string[];
  rating: number;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'lit',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    bannerColor: 'from-purple-500 to-violet-600',
    subject: 'Literature',
    subjectColor: 'bg-purple-100 text-purple-700',
    pages: 12,
    title: "The Role of Symbolism in Toni Morrison's Beloved",
    description: 'A deep literary analysis exploring trauma, memory, and freedom through recurring symbols.',
    tags: ['Literary Analysis', 'Masters', 'APA 7th'],
    rating: 5.0,
  },
  {
    id: 2,
    category: 'biz',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    bannerColor: 'from-blue-500 to-cyan-500',
    subject: 'Business',
    subjectColor: 'bg-blue-100 text-blue-700',
    pages: 18,
    title: 'Strategic Market Entry: Tesla in India Case Study',
    description: "Comprehensive analysis using Porter's Five Forces and SWOT framework with financial projections.",
    tags: ['MBA', 'Strategy', 'Harvard'],
    rating: 4.9,
  },
  {
    id: 3,
    category: 'nurs',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    bannerColor: 'from-teal-500 to-emerald-500',
    subject: 'Nursing',
    subjectColor: 'bg-teal-100 text-teal-700',
    pages: 10,
    title: 'Evidence-Based ICU Delirium Management Interventions',
    description: 'Systematic review of interventions supported by clinical trial data and nursing frameworks.',
    tags: ['Research', 'PhD', 'APA 7th'],
    rating: 5.0,
  },
  {
    id: 4,
    category: 'law',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    bannerColor: 'from-amber-500 to-orange-500',
    subject: 'Law',
    subjectColor: 'bg-amber-100 text-amber-700',
    pages: 22,
    title: 'GDPR Compliance Challenges for AI Data Processing',
    description: 'Legal analysis examining GDPR\'s "right to explanation" and ML model opacity.',
    tags: ['LLM', 'Privacy Law', 'OSCOLA'],
    rating: 4.8,
  },
  {
    id: 5,
    category: 'stem',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    bannerColor: 'from-indigo-500 to-blue-600',
    subject: 'STEM',
    subjectColor: 'bg-indigo-100 text-indigo-700',
    pages: 15,
    title: 'Quantum Computing in Cryptographic Security Systems',
    description: 'Technical research on quantum threats to RSA encryption and post-quantum standards.',
    tags: ['PhD', 'Cybersecurity', 'IEEE'],
    rating: 5.0,
  },
  {
    id: 6,
    category: 'stem',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop',
    bannerColor: 'from-green-500 to-lime-500',
    subject: 'Env. Science',
    subjectColor: 'bg-green-100 text-green-700',
    pages: 14,
    title: 'Carbon Capture Technology: Net Zero 2050 Pathways',
    description: 'Evaluates CCS technologies within IPCC scenarios, assessing costs and scalability.',
    tags: ['PhD', 'Policy', 'Vancouver'],
    rating: 4.9,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'lit', label: 'Literature' },
  { id: 'biz', label: 'Business' },
  { id: 'nurs', label: 'Nursing' },
  { id: 'law', label: 'Law' },
  { id: 'stem', label: 'STEM' },
];

interface PortfolioSectionProps {
  onNavigate?: (page: string) => void;
}

export default function PortfolioSection({ onNavigate }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M192 96c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zM64 160c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"/>
            </svg>
            Sample Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Our Writing Portfolio
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Browse through a selection of our expert-written papers across diverse subjects and academic levels.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                activeFilter === filter.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                  : 'border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => onNavigate?.('samples')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl font-bold text-lg shadow-lg"
          >
            View Full Portfolio →
          </Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.subject}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      {/* Banner */}
      <div className={`h-1.5 bg-gradient-to-r ${item.bannerColor}`} />
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.subjectColor}`}>
            {item.subject}
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
            {item.pages} Pages
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 dark:text-white line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-500">★★★★★</span>
            <span className="font-semibold text-gray-700 dark:text-slate-300 ml-1">
              {item.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 text-green-500">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
            </svg>
            Plagiarism Free
          </div>
        </div>
      </div>
    </article>
  );
}
