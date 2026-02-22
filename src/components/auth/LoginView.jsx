import React, { useState } from 'react';
import { Kanban, ArrowRight } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) onLogin({ email, id: Date.now() });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 text-center">
          <div className="bg-blue-600 p-4 rounded-2xl w-fit mx-auto mb-8 shadow-lg shadow-blue-200">
            <Kanban size={32} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">NuraTask</h1>
          <p className="text-slate-400 text-sm mb-10 font-medium">Your boards are locked. Please sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-bold"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;