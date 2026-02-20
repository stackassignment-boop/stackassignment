'use client';

import { FileText, CheckCircle, AlertTriangle, Scale, Shield, Clock, Mail, Phone } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg opacity-90">
            Please read these terms carefully before using our academic assistance services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <FileText className="w-4 h-4" /> Agreement
            </div>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing or using Stack Assignment services, you agree to be bound by these Terms
              of Service. If you disagree with any part of these terms, you do not have permission
              to access our services.
            </p>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Services */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <CheckCircle className="w-4 h-4" /> Services
            </div>
            <h2 className="text-2xl font-bold mb-4">2. Our Services</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Stack Assignment provides academic writing assistance, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Essay writing and editing</li>
              <li>Research paper assistance</li>
              <li>Dissertation and thesis support</li>
              <li>Assignment help</li>
              <li>Proofreading and formatting services</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Usage */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <AlertTriangle className="w-4 h-4" /> Important Notice
            </div>
            <h2 className="text-2xl font-bold mb-4">3. Intended Use</h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border-l-4 border-orange-600 mb-4">
              <p className="text-orange-700 dark:text-orange-300 font-medium">
                All papers and materials provided by Stack Assignment are intended solely for
                reference and learning purposes. They should NOT be submitted as your own work.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Use materials as reference guides for your own writing</li>
              <li>Learn proper formatting and citation styles</li>
              <li>Understand research methodology and structure</li>
              <li>Do not submit purchased papers as your original work</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Payments */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Scale className="w-4 h-4" /> Payments
            </div>
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
              <li>Payment is required before work begins</li>
              <li>Refunds are available under specific conditions</li>
              <li>Price adjustments may apply for scope changes</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Refunds */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Shield className="w-4 h-4" /> Refunds
            </div>
            <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              We offer refunds in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Work not delivered by the agreed deadline</li>
              <li>Significant deviation from requirements</li>
              <li>Plagiarism detected in delivered work</li>
              <li>Order cancelled before work begins (minus processing fees)</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Contact */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Mail className="w-4 h-4" /> Contact
            </div>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-bold">Email</p>
                <p className="text-sm">stackassignment@gmail.com</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-bold">Phone</p>
                <p className="text-sm">+91-91269-43297</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
