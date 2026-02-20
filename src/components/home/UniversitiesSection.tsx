'use client';

// University logos with local images
const universities = [
  { name: 'De Montfort University', image: '/universities/001.jpg' },
  { name: 'Federation University', image: '/universities/002.jpg' },
  { name: 'University of Newcastle', image: '/universities/003.jpg' },
  { name: 'University of New England', image: '/universities/004.jpg' },
  { name: 'UNSW Sydney', image: '/universities/005.jpg' },
  { name: 'University of Canberra', image: '/universities/006.jpg' },
  { name: 'University of Sunshine Coast', image: '/universities/007.jpg' },
  { name: 'University of Western Australia', image: '/universities/008.jpg' },
  { name: 'Kaplan University', image: '/universities/009.jpg' },
  { name: 'Victoria University', image: '/universities/0010.jpg' },
  { name: 'Torrens University', image: '/universities/0011.jpg' },
  { name: 'Holmes Institute', image: '/universities/0012.jpg' },
  { name: 'Melbourne Institute of Technology', image: '/universities/0013.jpg' },
  { name: 'Southampton Solent University', image: '/universities/0014.jpg' },
];

export default function UniversitiesSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 45%, #3b82f6 100%)'
      }}
    >
      {/* Background effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-semibold text-white mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className="w-4 h-4">
              <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9V320c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.5 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32z"/>
            </svg>
            University Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Providing Expert Guidance for<br />Leading Universities Worldwide
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg">
            We help students from top-tier universities achieve their academic goals with expert guidance tailored to institutional standards.
          </p>
        </div>

        {/* Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          <StatPill icon="building" value="500+" label="Academic Partners" />
          <StatPill icon="award" value="150+" label="Top Universities" />
          <StatPill icon="globe" value="50+" label="Countries" />
          <StatPill icon="chart" value="99.2%" label="Success Rate" />
        </div>

        {/* Title */}
        <p className="text-center text-white font-semibold text-lg mb-2">
          Trusted by Students From
        </p>
        <p className="text-center text-white/50 text-sm mb-8">
          Hover to pause • Scroll automatically
        </p>

        {/* Marquee */}
        <Marquee universities={universities} />
      </div>
    </section>
  );
}

function StatPill({ icon, value, label }: { icon: string; value: string; label: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    'building': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
      </svg>
    ),
    'award': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M173.9 39.4l-9.3 27.8c-4.6 13.8-15.4 24.6-29.2 29.2L107.4 105.8c-7.5 2.5-7.5 13.2 0 15.7l27.9 9.4c13.8 4.6 24.6 15.4 29.2 29.2l9.4 27.9c2.5 7.5 13.2 7.5 15.7 0l9.4-27.9c4.6-13.8 15.4-24.6 29.2-29.2l27.9-9.4c7.5-2.5 7.5-13.2 0-15.7l-27.9-9.4c-13.8-4.6-24.6-15.4-29.2-29.2l-9.4-27.9c-2.5-7.5-13.2-7.5-15.7 0zM367.9 119.9l-6.3 18.8c-2.3 6.9-7.9 12.5-14.8 14.8l-18.8 6.3c-3.7 1.2-3.7 6.6 0 7.9l18.8 6.3c6.9 2.3 12.5 7.9 14.8 14.8l6.3 18.8c1.2 3.7 6.6 3.7 7.9 0l6.3-18.8c2.3-6.9 7.9-12.5 14.8-14.8l18.8-6.3c3.7-1.2 3.7-6.6 0-7.9l-18.8-6.3c-6.9-2.3-12.5-7.9-14.8-14.8l-6.3-18.8c-1.2-3.7-6.6-3.7-7.9 0zM256 224l-32 96-96 32 96 32 32 96 32-96 96-32-96-32-32-96z"/>
      </svg>
    ),
    'globe': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H501.4c4.9 20.5 7.6 41.9 7.6 64s-2.7 43.5-7.6 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.1-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.2 112.2 28.5 190.6 7.9C165.1 42.1 145.3 95.6 135.3 159.6zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C3.2 299.5 0 278.1 0 256s3.2-43.5 8.1-64zM194.7 446.5c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
      </svg>
    ),
    'chart': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5">
        <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
      </svg>
    ),
  };

  return (
    <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 flex items-center gap-3 backdrop-blur-sm transition-all hover:bg-white/25 hover:-translate-y-1">
      <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0">
        {iconMap[icon]}
      </div>
      <div>
        <div className="text-white font-bold text-xl leading-none">{value}</div>
        <div className="text-white/60 text-xs mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function Marquee({ universities }: { universities: { name: string; image: string }[] }) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-700 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-500 to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-6"
        style={{
          animation: 'marquee 40s linear infinite',
          width: 'max-content'
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...universities, ...universities].map((uni, index) => (
          <div
            key={index}
            className="bg-white/95 border border-white/40 rounded-2xl px-5 py-3 flex items-center justify-center min-w-[200px] h-[65px] flex-shrink-0 transition-all hover:bg-white hover:scale-105 shadow-lg"
          >
            <img
              src={uni.image}
              alt={uni.name}
              className="max-h-[45px] max-w-[180px] object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
