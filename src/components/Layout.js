import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, isLoggedIn, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f4f7fa] dark:bg-[#0f172a] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-hidden relative text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 dark:bg-purple-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/30 dark:bg-blue-900/20 blur-[120px] pointer-events-none z-0" />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10 w-full">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
