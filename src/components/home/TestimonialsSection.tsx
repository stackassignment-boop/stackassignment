'use client';

interface TestimonialsSectionProps {
  onNavigate?: (page: string) => void;
}

const testimonials = [
  {
    initials: 'SE',
    name: 'Sarah Edwards',
    program: 'Masters in Business • University of Melbourne',
    rating: 5.0,
    text: 'Absolutely transparent process from start to finish! They delivered my marketing strategy paper 2 days before the deadline. The quality exceeded my expectations and I scored an 86%. Communication was excellent throughout.',
    time: '2 days ago',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    initials: 'RP',
    name: 'Rajesh Patel',
    program: 'PhD Computer Science • UNSW Sydney',
    rating: 5.0,
    text: "The expert assigned to my thesis chapter had genuine PhD-level knowledge in machine learning. Every citation was accurate, methodology was sound, and the writing quality was exceptional. Worth every dollar!",
    time: '5 days ago',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    initials: 'EM',
    name: 'Emily Martinez',
    program: 'Nursing • Torrens University',
    rating: 5.0,
    text: 'Had a medical case study due in 48 hours and was completely overwhelmed. Stack Assignment saved me! The writer understood evidence-based practice perfectly. Got a Distinction and learned a lot from the model.',
    time: '1 week ago',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    initials: 'LW',
    name: 'Lucas Wong',
    program: 'Law • Monash University',
    rating: 5.0,
    text: 'The legal research memo was impeccable. Every case citation followed AGLC4 perfectly, arguments were structured logically, and the statutory analysis was thorough. This is exactly what I needed to understand proper legal writing.',
    time: '1 week ago',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    initials: 'AP',
    name: 'Aisha Patel',
    program: 'Literature • University of Sydney',
    rating: 5.0,
    text: 'My Shakespeare analysis essay was beautifully written with deep literary insight. The writer clearly understood post-colonial theory and close reading techniques. Got a High Distinction (88%) - best mark this semester!',
    time: '2 weeks ago',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    initials: 'JK',
    name: 'James Kim',
    program: 'Engineering • MIT',
    rating: 5.0,
    text: 'The technical report on renewable energy systems was phenomenal. Complex engineering concepts explained clearly, calculations verified, and figures professionally formatted. Pricing was very reasonable for PhD-level work.',
    time: '2 weeks ago',
    gradient: 'from-purple-400 to-fuchsia-500',
  },
  {
    initials: 'OA',
    name: 'Olivia Anderson',
    program: 'Psychology • Macquarie University',
    rating: 4.8,
    text: 'Research proposal on cognitive behavioral therapy was well-structured with current peer-reviewed sources. Only minor formatting issue was fixed within hours. Customer support responded instantly via WhatsApp. Very satisfied!',
    time: '3 weeks ago',
    gradient: 'from-teal-400 to-cyan-500',
  },
  {
    initials: 'MR',
    name: 'Mohammed Rahman',
    program: 'Finance • University of Queensland',
    rating: 5.0,
    text: 'Financial analysis with DCF models and ratio analysis was exactly what I needed. Excel calculations were accurate, assumptions clearly stated. This helped me understand corporate valuation much better. Highly recommend!',
    time: '3 weeks ago',
    gradient: 'from-red-400 to-pink-500',
  },
  {
    initials: 'SL',
    name: 'Sophie Lewis',
    program: 'History • University of Western Australia',
    rating: 5.0,
    text: 'Historiographical essay on the Cold War was exceptional. Used primary sources from archives, secondary scholarship was recent and relevant. Citations were perfect Chicago style. This is my third order - consistently excellent!',
    time: '1 month ago',
    gradient: 'from-lime-400 to-green-500',
  },
  {
    initials: 'DC',
    name: 'Daniel Chen',
    program: 'Data Science • Victoria University',
    rating: 5.0,
    text: 'The data analysis report with Python code was brilliant. Visualizations were publication-quality, statistical tests properly justified. Plagiarism report showed 100% original. Best value for money I have found online!',
    time: '1 month ago',
    gradient: 'from-violet-400 to-purple-500',
  },
];

export default function TestimonialsSection({ onNavigate }: TestimonialsSectionProps) {
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  // Duplicate testimonials for seamless loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Student Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Real feedback from students who&apos;ve experienced our premium academic assistance
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">4.9/5</span>
              <span className="text-gray-500 dark:text-slate-400 text-sm">from 2,300+ reviews</span>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-slate-300 font-semibold">98% Satisfaction Rate</span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-indigo-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-indigo-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="overflow-hidden py-2">
            <div
              className="flex gap-6"
              style={{
                animation: 'scrollTestimonials 60s linear infinite',
                width: 'max-content',
              }}
            >
              {allTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 min-w-[380px] max-w-[380px] shadow-lg border border-indigo-100 dark:border-indigo-900/30 flex-shrink-0 hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-slate-400">{testimonial.program}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(testimonial.rating)}
                        <span className="text-xs font-semibold text-gray-600 dark:text-slate-400 ml-1">{testimonial.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm mb-4">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified Student
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{testimonial.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => handleNav('order')}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Join 2,300+ Satisfied Students →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollTestimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-380px * 10 - 24px * 10)); }
        }
      `}</style>
    </section>
  );
}
