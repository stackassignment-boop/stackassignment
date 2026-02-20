'use client';

import { PenTool, BookOpen, FlaskConical, ClipboardList, Edit3, Laptop } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Essay Writing',
    description: '500–5,000+ words • Any topic • Any deadline • MLA, APA, Harvard, Chicago',
    features: ['Argumentative, descriptive, narrative', 'Literature reviews & critical analysis'],
  },
  {
    icon: BookOpen,
    title: 'Dissertation & Thesis',
    description: 'Full document, chapters, proposal, abstract, literature review, methodology, results',
    features: ["Master's & PhD level", 'Data analysis (SPSS, R, NVivo)'],
  },
  {
    icon: FlaskConical,
    title: 'Research Papers & Articles',
    description: 'Empirical, theoretical, systematic reviews • Any citation style',
    features: ['Primary & secondary research', 'Plagiarism report included'],
  },
  {
    icon: ClipboardList,
    title: 'Assignment & Coursework Help',
    description: 'Homework, case studies, reports, presentations, lab reports',
    features: ['Weekly & semester-long support', 'PowerPoint + speaker notes'],
  },
  {
    icon: Edit3,
    title: 'Editing & Proofreading',
    description: 'Improve structure, grammar, flow, academic tone • Reduce plagiarism',
    features: ['Track changes + detailed comments', 'Formatting & referencing check'],
  },
  {
    icon: Laptop,
    title: 'Online Exam & Quiz Assistance',
    description: 'Live proctored exams, timed quizzes, discussion boards',
    features: ['Real-time support', 'Subject experts available 24/7'],
  },
];

export default function ServicesPage() {
  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Academic Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From high school assignments to PhD dissertations — we cover every level and subject
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-7 md:p-8 transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Not sure which service fits your requirement? Get a free consultation in minutes.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-md"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </main>
  );
}
