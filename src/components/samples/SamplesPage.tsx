'use client';

const samples = [
  {
    id: '1',
    title: 'Business Strategy Essay',
    subject: 'MBA • 2800 words • APA 7th',
    academicLevel: 'MBA',
    pages: 10,
    preview:
      "This paper examines the application of Porter's Five Forces framework to the Indian electric vehicle market...",
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: '2',
    title: 'Nursing Care Plan',
    subject: 'B.Sc Nursing • 1900 words • Harvard',
    academicLevel: 'Bachelor',
    pages: 7,
    preview:
      'Patient with Type 2 Diabetes Mellitus – comprehensive care plan including pathophysiology, nursing diagnosis...',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: '3',
    title: 'Machine Learning Research Paper',
    subject: 'B.Tech CS • 4200 words • IEEE',
    academicLevel: 'Bachelor',
    pages: 15,
    preview:
      'Comparative analysis of machine learning algorithms (Random Forest, SVM, XGBoost) for detecting phishing URLs...',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export default function SamplesPage() {

  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Assignment & Essay Samples</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            First 3 paragraphs are visible • remaining content is blurred for preview
          </p>
        </div>

        {/* Samples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {samples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              {/* Header with gradient */}
              <div
                className={`h-48 bg-gradient-to-br ${sample.gradient} flex items-center justify-center text-white p-6 text-center`}
              >
                <div>
                  <h3 className="text-xl font-bold">{sample.title}</h3>
                  <p className="text-white/80 mt-2 text-sm">{sample.subject}</p>
                </div>
              </div>

              {/* Preview content */}
              <div className="p-6 md:p-7">
                <div className="relative mb-6 bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{sample.preview}</p>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Key findings include the importance of digital channels and localization
                    strategies...
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Recommendations include strategic partnerships and R&amp;D investment...
                  </p>
                  {/* Blurred content */}
                  <div className="blur-sm pointer-events-none select-none">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Additional content continues here...
                    </p>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      More detailed analysis...
                    </p>
                  </div>
                  {/* Fade overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-slate-700 to-transparent pointer-events-none" />
                </div>

                <button className="block w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition">
                  View Sample PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
