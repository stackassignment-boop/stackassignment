'use client';

import { Shield, Database, Settings, Share2, Lock, UserCheck, Cookie, RefreshCw, Mail, Phone, Clock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-indigo-700 text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">
            How we collect, use, and protect your personal information when using our academic
            assistance services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-indigo-200 dark:border-indigo-900 mb-12 flex items-start gap-5">
          <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <p className="text-base">
            At Stack Assignment, we are committed to protecting your privacy and handling your data
            responsibly. This policy explains our practices in clear terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Database className="w-4 h-4" /> Overview
            </div>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              This Privacy Policy explains how Stack Assignment collects, uses, and safeguards your
              personal information when you visit our website or use our academic assistance
              services.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Effective Date: January 1, 2026
              <br />
              Last Updated: February 15, 2026
            </p>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Information We Collect */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Database className="w-4 h-4" /> Data Types
            </div>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-indigo-600 dark:border-indigo-400">
                <h4 className="font-bold mb-2">Personal Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Name, email address, phone number, academic details when you place an order or
                  contact us.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-blue-600">
                <h4 className="font-bold mb-2">Payment Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Processed securely through third-party providers; we don&apos;t store card details.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-green-600">
                <h4 className="font-bold mb-2">Usage Data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  IP address, browser type, pages visited, time spent on site.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-purple-600">
                <h4 className="font-bold mb-2">Cookies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  For site functionality and analytics.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* How We Use Information */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Settings className="w-4 h-4" /> Purposes
            </div>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Process orders and deliver academic assistance</li>
              <li>Communicate with you about your requests</li>
              <li>Improve our website and services</li>
              <li>Send promotional materials (with opt-out option)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Security */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Lock className="w-4 h-4" /> Protection
            </div>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and access controls</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          <hr className="border-gray-200 dark:border-slate-700" />

          {/* Contact */}
          <section>
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
              <Mail className="w-4 h-4" /> Contact
            </div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-bold">Email</p>
                <p className="text-sm">stackassignment@gmail.com</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-bold">Phone / WhatsApp</p>
                <p className="text-sm">+91-91269-43297</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-bold">Response Time</p>
                <p className="text-sm">Within 30 days</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
