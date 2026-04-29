import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Key, CreditCard, Settings, LogOut, LogIn, Hexagon, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'API Keys', path: '/keys', icon: Key },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={`
      fixed md:sticky top-0 left-0 h-screen w-64 bg-white/80 md:bg-white/40 dark:bg-slate-900/80 md:dark:bg-slate-900/40 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col pt-8 pb-6 px-6 z-30 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]'}
    `}>
      <div className="flex items-center justify-between mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Hexagon size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            MeterFlow
          </h1>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          className="md:hidden p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-indigo-500 dark:hover:text-indigo-400'
              }`
            }
          >
            <item.icon size={20} className="stroke-[2.5px]" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        {isLoggedIn ? (
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-red-500 dark:hover:text-red-400 transition-all font-medium"
          >
            <LogOut size={20} className="stroke-[2.5px]" />
            Sign Out
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl transition-colors font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
          >
            <LogIn size={20} className="stroke-[2.5px]" />
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
