'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

interface OrderPageProps {
  onNavigate?: (page: string) => void;
}

export default function OrderPage({ onNavigate }: OrderPageProps) {
  const [service, setService] = useState('writing');
  const [pages, setPages] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [expertCount, setExpertCount] = useState(178);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subject: '',
    deadlineDate: '',
    deadlineTime: '12:00',
    timezone: '+91',
    description: '',
    coupon: '',
    terms: false
  });

  // Fetch user session on mount to autofill email
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data?.user?.email) {
            setFormData(prev => ({
              ...prev,
              email: data.user.email
            }));
            setIsSignedIn(true);
            // Also try to fetch profile for phone
            const profileRes = await fetch('/api/student/profile');
            if (profileRes.ok) {
              const profileData = await profileRes.json();
              if (profileData.profile?.phone) {
                setFormData(prev => ({
                  ...prev,
                  phone: profileData.profile.phone.replace(/^\+91/, '')
                }));
              }
            }
          }
        }
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserSession();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Upload files first if any
      let uploadedFiles: string[] = [];
      if (files.length > 0) {
        setUploadingFiles(true);
        console.log('[OrderForm] Uploading files:', files.map(f => ({ name: f.name, size: f.size })));
        
        const formDataFiles = new FormData();
        files.forEach((file) => {
          formDataFiles.append('files', file);
        });
        
        console.log('[OrderForm] FormData created, sending upload request...');
        
        try {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formDataFiles,
          });
          
          console.log('[OrderForm] Upload response status:', uploadRes.status);
          
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            uploadedFiles = uploadData.urls || [];
            console.log('[OrderForm] Files uploaded successfully:', uploadedFiles);
          } else {
            const uploadError = await uploadRes.json();
            console.error('[OrderForm] Upload failed:', uploadError);
            setError(uploadError.error || 'Failed to upload files. Please try again.');
            setSubmitting(false);
            setUploadingFiles(false);
            return;
          }
        } catch (uploadErr) {
          console.error('[OrderForm] Upload error:', uploadErr);
          setError('Failed to upload files. Please check your connection and try again.');
          setSubmitting(false);
          setUploadingFiles(false);
          return;
        }
        
        setUploadingFiles(false);
      }

      console.log('Submitting order with attachments:', uploadedFiles);
      
      const response = await fetch('/api/orders/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: `${formData.timezone}${formData.phone}`,
          subject: formData.subject,
          description: formData.description,
          deadline: formData.deadlineDate,
          deadlineTime: formData.deadlineTime,
          pages: pages,
          service: service,
          coupon: formData.coupon,
          attachments: uploadedFiles,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrderNumber(data.order.orderNumber);
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const wordCount = pages * 250;

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Order Submitted Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your order. We will contact you shortly via email and phone.
            </p>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Order Number</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{orderNumber}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate?.('home')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    email: '',
                    phone: '',
                    subject: '',
                    deadlineDate: '',
                    deadlineTime: '12:00',
                    timezone: '+91',
                    description: '',
                    coupon: '',
                    terms: false
                  });
                  setPages(1);
                }}
                variant="outline"
                className="px-8"
              >
                Place Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Get Instant Help From 450+ Experts
          </h1>
          
          {/* Coupon Banner */}
          <div className="mt-5 mx-auto max-w-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-400 dark:border-green-600 rounded-xl px-5 py-3.5 shadow-md">
            <p className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2 flex-wrap">
              🎁 <span>For New Customers Use Coupon Code</span>
              <code className="bg-green-600 text-white px-3 py-1 rounded-md font-mono text-sm">NewtoStack33</code>
              <span>to get 33% discount.</span>
            </p>
          </div>
          
          {/* Service Type Tabs */}
          <div className="flex justify-center gap-0 mt-6 max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-slate-700">
            {['writing', 'rewriting', 'editing'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all capitalize ${
                  service === s
                    ? 'bg-indigo-600 text-white shadow-lg -translate-y-0.5'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center">
              {error}
            </div>
          </div>
        )}

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Email */}
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">E-mail <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={loadingUser ? "Loading..." : "Enter email for communication"}
                  disabled={loadingUser}
                  readOnly={isSignedIn}
                  className={isSignedIn ? "bg-gray-100 dark:bg-slate-700 cursor-not-allowed" : ""}
                />
                {isSignedIn && !loadingUser && (
                  <p className="text-xs text-green-600 mt-1.5">✓ Signed in as {formData.email}</p>
                )}
              </CardContent>
            </Card>

            {/* Phone Number */}
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Phone Number <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 w-28"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+64">🇳🇿 +64</option>
                  </select>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1"
                    placeholder="Phone Number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subject */}
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Subject/CourseCode <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Eg. UNCC100 Self & Community"
                />
              </CardContent>
            </Card>

            {/* Deadline */}
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">Deadline <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    type="date"
                    required
                    value={formData.deadlineDate}
                    onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <select 
                    className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                    value={formData.deadlineTime}
                    onChange={(e) => setFormData({ ...formData, deadlineTime: e.target.value })}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {i === 0 ? '12:00 AM' : i < 12 ? `${i}:00 AM` : i === 12 ? '12:00 PM' : `${i - 12}:00 PM`}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Pages */}
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">
                  No. of pages <span className="text-xs font-normal text-gray-500">(1 page = 250 words)</span>
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPages(Math.max(1, pages - 1))}
                    className="w-12 h-12 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95"
                  >
                    −
                  </button>
                  <Input
                    type="number"
                    value={pages}
                    readOnly
                    className="w-20 text-center text-xl font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setPages(pages + 1)}
                    className="w-12 h-12 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-lg font-bold text-xl flex items-center justify-center transition active:scale-95"
                  >
                    +
                  </button>
                  <span className="ml-2 text-gray-600 dark:text-gray-400 font-semibold">
                    {wordCount.toLocaleString()} Words
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <Card className="shadow-md border-gray-200 dark:border-slate-700">
              <CardContent className="p-5 md:p-6">
                <Label className="block text-sm font-bold mb-2.5">
                  Assignment Description <span className="text-red-500">*</span>
                </Label>
                <textarea
                  required
                  rows={8}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe your assignment: topic, requirements, formatting style, references needed..."
                />

                {/* File Upload */}
                <div className="mt-4">
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm cursor-pointer transition">
                    📎 Add Files
                    <input type="file" multiple className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.zip" />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-green-600 font-medium">✓ {files.length} file(s) selected:</p>
                      <div className="space-y-1">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-lg px-3 py-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{file.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                              <button
                                type="button"
                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Coupon */}
                <div className="mt-4">
                  <Label className="block text-sm font-semibold mb-2">Coupon Code</Label>
                  <Input
                    type="text"
                    value={formData.coupon}
                    onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                    placeholder="e.g., NewtoStack33"
                  />
                </div>

                {/* Live Experts */}
                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-green-600">{expertCount}</span>
                  <span className="text-gray-600">experts available now!</span>
                </div>

                {/* Terms */}
                <label className="mt-5 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">
                    I accept the <span className="text-indigo-600 font-medium">T&C</span> and agree to receive offers.
                  </span>
                </label>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-6 rounded-xl text-lg shadow-lg disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {uploadingFiles ? 'Uploading files...' : 'Submitting...'}
                    </span>
                  ) : (
                    'Submit Order'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
