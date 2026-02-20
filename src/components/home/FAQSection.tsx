'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'Is using StackAssignment legal for students in the UK and Australia?',
    answer: 'Absolutely. We provide model answers and study guides intended to be used as a reference to help you structure your own work. Using our service is a legitimate way to understand complex topics, provided you use the final product as a learning tool to craft your own unique submission.',
  },
  {
    question: 'How do you handle Turnitin and AI-detection reports?',
    answer: 'Every assignment is written from scratch by human experts to ensure it reflects a natural academic voice. Along with your solution, we provide a free Turnitin Similarity Report and a comprehensive AI-Detection Verification to guarantee the work is 100% original and "human-made."',
  },
  {
    question: 'Do your writers understand UK/Australian university marking rubrics?',
    answer: 'Yes. We match your project with writers who have attained degrees from reputable institutions in your specific region. They are well-versed in local marking criteria, British/Australian English spellings, and specific institutional requirements.',
  },
  {
    question: 'Can I request specific referencing styles like Harvard (UK) or AGLC?',
    answer: "Definitely. Our experts are proficient in all major styles, including Harvard (UK/AU), APA 7th, Oxford, and AGLC. Just specify your university's preferred style when placing your order, and we will ensure every citation is perfect.",
  },
  {
    question: 'What if my deadline is extremely tight (6-12 hours)?',
    answer: 'We specialize in urgent turnarounds. Our team is available 24/7, and we have a dedicated "Rapid Response" unit for deadlines as short as 6 hours, ensuring quality is never sacrificed for speed.',
  },
  {
    question: 'What is your revision policy if I need changes based on professor feedback?',
    answer: 'Your satisfaction is our priority. We offer unlimited free revisions within 14 days of delivery. Simply upload your tutor\'s feedback, and your expert will adjust the work until it aligns perfectly with your requirements.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
      }}
    >
      {/* Background effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-semibold text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 164.2c6.6-14.1 23.3-20.3 37.4-13.7L256 178.1l48.8-27.6c14.1-6.6 30.8-.4 37.4 13.7s.4 30.8-13.7 37.4L280 229.1V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V229.1l-48.5-27.5c-14.1-6.6-20.3-23.3-13.7-37.4zM256 416c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/>
            </svg>
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked <span className="text-purple-300">Questions</span>
          </h2>
          <p className="text-white/70 mt-4 text-lg">
            Everything you need to know about our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onClick }: { faq: FAQ; isOpen: boolean; onClick: () => void }) {
  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-white/20 border-purple-400/40' 
          : 'bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/25'
      } border backdrop-blur-sm`}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <span className="text-lg font-semibold text-white pr-4">
          {faq.question}
        </span>
        <div 
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xl font-light flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-purple-500/30 rotate-45' : 'bg-white/10'
          }`}
        >
          +
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-400 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-white/80 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
