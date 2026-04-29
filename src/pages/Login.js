import React, { useState } from 'react';
import { Hexagon, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // NOTE TO USER: To send ACTUAL emails, you must create a free account at https://www.emailjs.com/
      // Then replace these 3 placeholders with your own keys from your EmailJS dashboard:
      const SERVICE_ID = "YOUR_SERVICE_ID";
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
      const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

      // Only attempt to send if keys are provided, otherwise simulate
      if (SERVICE_ID !== "YOUR_SERVICE_ID") {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            to_email: email,
            message: "A new sign-in was detected on your MeterFlow account.",
          },
          PUBLIC_KEY
        );
        console.log("Real email sent successfully via EmailJS!");
      } else {
        console.log("EmailJS keys not configured. Simulating email send...");
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
      setShowNotification(true);
      
      // After showing notification, log the user in
      setTimeout(() => {
        onLogin();
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] dark:bg-[#0f172a] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-100 relative overflow-hidden px-4 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-900/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-900/30 blur-[120px] pointer-events-none" />

      {/* Notification Toast */}
      <div className={`absolute top-8 right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-emerald-100 dark:border-slate-700 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none flex items-center gap-3 transform transition-all duration-500 z-50 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white text-sm">Sign in attempt detected</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">A notification has been sent to your email.</p>
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10 relative z-10">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl text-white shadow-xl shadow-indigo-500/30">
            <Hexagon size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            MeterFlow
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Log in to manage your API gateway</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white dark:border-slate-700 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || showNotification}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 dark:shadow-indigo-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : showNotification ? (
                <span>Redirecting...</span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account? <a href="#" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Start for free</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
