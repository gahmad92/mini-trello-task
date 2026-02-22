import React, { useState } from 'react';
import { Kanban, ArrowRight, Sparkles, Zap } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) onLogin({ email, id: Date.now() });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden">
      
      {/* --- ELECTRICAL BLAZING BACKGROUND --- */}
      {/* The "Power Lines" - Moving Linear Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Horizontal Surge */}
        <div className="absolute top-1/4 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20 animate-surge" />
        <div className="absolute top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-10 animate-surge delay-1000" />
        
        {/* Blazing Glow Orbs with "Turbulence" */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px] animate-vibrate" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[160px] animate-vibrate delay-500" />
        
        {/* Plasma Static Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="relative w-full max-w-md p-8 animate-in fade-in zoom-in duration-1000">
        {/* Inner Glow to make the card "pop" from the electricity */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3.1rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative backdrop-blur-2xl bg-slate-950/80 p-10 rounded-[3rem] border border-white/10 shadow-2xl text-center">
          
          {/* Logo with Electric Pulse */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-slate-900 border border-white/10 p-5 rounded-2xl w-fit mx-auto shadow-inner">
              <Kanban size={32} className="text-blue-400" />
            </div>
          </div>
          
          <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center justify-center gap-2">
              NURA<span className="text-blue-500">TASK</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-blue-400/80 uppercase tracking-[0.3em] text-[10px] font-bold">
              <Zap size={12} fill="currentColor" /> System Online
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input 
              type="email" 
              placeholder="Authentication Key (Email)"
              required
              className="w-full px-6 py-4 rounded-xl bg-slate-900/50 border border-white/5 outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white text-sm placeholder:text-slate-600"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="w-full relative overflow-hidden bg-white text-black font-black py-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group active:scale-95">
              <span className="relative z-10">LAUNCH</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-4 text-slate-600">
             <div className="h-[1px] w-8 bg-slate-800" />
             <span className="text-[9px] font-bold tracking-widest uppercase">Ghualm Haider Production</span>
             <div className="h-[1px] w-8 bg-slate-800" />
          </div>
        </div>
      </div>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes surge {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes vibrate {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5px, -5px) scale(1.05); }
          66% { transform: translate(-5px, 5px) scale(0.95); }
        }
        .animate-surge { animation: surge 3s linear infinite; }
        .animate-vibrate { animation: vibrate 8s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default LoginView;