import React from 'react';
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/keys': return 'API Management';
      case '/billing': return 'Billing & Subscriptions';
      case '/settings': return 'System Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className="h-20 px-4 md:px-8 flex items-center justify-between bg-transparent w-full z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition-colors"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white hidden sm:block">{getPageTitle()}</h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Welcome back, Kusumita 👩‍💻</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search API's, users..."
            className="pl-10 pr-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm w-48 lg:w-64 transition-all focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all">
          <Search size={18} />
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="hidden sm:block p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-yellow-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="h-9 w-9 md:h-10 md:w-10 ml-1 md:ml-2 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-sm cursor-pointer">
            <img 
              src="https://ui-avatars.com/api/?name=Kusumita&background=ffffff&color=4f46e5&bold=true" 
              alt="User" 
              className="rounded-full h-full w-full object-cover border border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
