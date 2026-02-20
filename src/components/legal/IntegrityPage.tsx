'use client';

import { GraduationCap, AlertTriangle, CheckCircle, BookOpen, Users, Shield, Scale } from 'lucide-react';

export default function IntegrityPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-teal-600 text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Integrity</h1>
          <p className="text-lg opacity-90">
            Our commitment to ethical academic assistance and your responsibility as a student.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <GraduationCap className="w-4 h-4" /> Our Commitment
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Stance on Academic Integrity</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stack Assignment is committed to upholding the highest standards of academic
              integrity. We believe in supporting students&apos; educational journey while maintaining
              ethical boundaries. Our services are designed to help you learn and improve your
              academic skills, not to replace your own effort.
            </p>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Important Notice */}
          <section>
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <AlertTriangle className="w-4 h-4" /> Important
            </div>
            <h2 className="text-2xl font-bold mb-4">How to Use Our Services Ethically</h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border-l-4 border-orange-600 mb-6">
              <p className="text-orange-700 dark:text-orange-300 font-medium">
                Our papers are meant to be used as MODEL papers for learning purposes only. They
                should NOT be submitted as your own work to any educational institution.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-green-600">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" /> Acceptable Use
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Using papers as reference for your own research</li>
                  <li>• Learning proper citation and formatting</li>
                  <li>• Understanding topic structure and flow</li>
                  <li>• Getting feedback on your writing approach</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-red-600">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" /> Unacceptable Use
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Submitting papers as your own work</li>
                  <li>• Using content without proper attribution</li>
                  <li>• Claiming authorship of purchased materials</li>
                  <li>• Violating your institution&apos;s academic policies</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Our Commitment */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Shield className="w-4 h-4" /> Our Promise
            </div>
            <h2 className="text-2xl font-bold mb-4">What We Guarantee</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
                <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Original Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Every paper is written from scratch with plagiarism checks
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Expert Writers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Qualified professionals with academic backgrounds
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
                <Scale className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Ethical Standards</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We follow strict ethical guidelines in all our services
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Student Responsibility */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Users className="w-4 h-4" /> Your Role
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Responsibility as a Student</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              As a user of our services, you have certain responsibilities:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Familiarize yourself with your institution&apos;s academic integrity policies</li>
              <li>Use our materials only as references and learning aids</li>
              <li>Properly cite any ideas or content you reference from our materials</li>
              <li>Ensure your own work reflects your understanding and effort</li>
              <li>Seek clarification if you are unsure about ethical usage</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
