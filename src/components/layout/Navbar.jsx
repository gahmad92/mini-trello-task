import React from 'react';
import { Search, Bell, HelpCircle, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      {/* Left side: Search Bar (Requirement: Debounced Search) */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search tasks, boards, or members..."
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <HelpCircle size={20} />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-lg transition-all">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            JS
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700 leading-none">John Smith</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Owner</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;