'use client';

import { GraduationCap, Phone, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 text-white text-2xl font-bold mb-4">
                <GraduationCap className="w-8 h-8 text-indigo-400" />
                Stack Assignment
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Professional academic writing &amp; assignment assistance.
                <br />
                Providing model / reference papers only — for learning purposes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('pricing')}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('samples')}
                    className="hover:text-white transition-colors"
                  >
                    Samples
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('blog')}
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Support</h4>
              <p className="text-sm mb-2 opacity-90">24/7 Assistance</p>
              <a
                href="tel:+919126943297"
                className="block text-sm hover:text-white transition-colors mb-1.5 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-indigo-400" /> +91 91269 43297
              </a>
              <a
                href="mailto:stackassignment@gmail.com"
                className="block text-sm hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-400" /> stackassignment@gmail.com
              </a>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    onClick={() => handleNav('terms')}
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('privacy')}
                    className="hover:text-white transition-colors text-indigo-400"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('integrity')}
                    className="hover:text-white transition-colors"
                  >
                    Academic Integrity
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-10 pt-6 border-t border-slate-700">
            <div className="flex justify-center gap-8">
              <a
                href="https://facebook.com/stackassignment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-2xl"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/stackassignment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors text-2xl"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm opacity-75">
            © 2010–2026 Stack Assignment. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919126943297?text=Hi%2C%20I%20need%20help%20with%20my%20assignment%20%E2%80%93%20can%20you%20help%3F%20Please%20tell%20me%20the%20subject%2C%20deadline%20and%20word%20count."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        {/* Tooltip */}
        <span className="absolute right-20 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/90 text-white text-sm px-4 py-2.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
          Chat with us on WhatsApp!
        </span>
      </a>
    </>
  );
}
