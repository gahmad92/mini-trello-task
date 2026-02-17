import React from 'react';
import { Clock, AlignLeft, CheckSquare, Trash2 } from 'lucide-react';
import { useBoard } from '../../context/BoardContext';
import { motion } from 'framer-motion';

const Card = ({ card, listId, boardId, onClick }) => {
  const { deleteCard } = useBoard();

  const priorityColors = {
    High: 'bg-rose-100 text-rose-600 border-rose-200',
    Medium: 'bg-amber-100 text-amber-600 border-amber-200',
    Low: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  };

  const formatTime = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    return mins > 0 ? `${mins}m` : `${seconds}s`;
  };

  return (
    <motion.div
      layoutId={card.id}
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer group relative transition-shadow overflow-hidden"
    >
      {/* --- TOP HEADER ROW: LABELS + PRIORITY --- */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Label Pills */}
        <div className="flex flex-wrap gap-1">
          {card.labels && card.labels.length > 0 ? (
            card.labels.map((label) => (
              <div 
                key={label.id} 
                className={`h-1.5 w-6 rounded-full ${label.color} shadow-sm`} 
                title={label.name}
              />
            ))
          ) : (
            // Tiny placeholder to keep layout consistent if no labels
            <div className="h-1.5 w-6 bg-slate-100 rounded-full" />
          )}
        </div>

        {/* Priority Badge */}
        <div className={`text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded border ${priorityColors[card.priority] || priorityColors.Medium}`}>
          {card.priority || 'Medium'}
        </div>
      </div>

      {/* --- TITLE & TIME --- */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <h4 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
          {card.title}
        </h4>
        
        {card.timeLogged > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
            <Clock size={10} />
            {formatTime(card.timeLogged)}
          </div>
        )}
      </div>

      {/* --- CARD FOOTER: BADGES & ACTIONS --- */}
      <div className="flex items-center gap-3 text-slate-400 mt-2">
        <div className="flex items-center gap-2">
          {card.description && (
            <AlignLeft size={14} className="text-slate-400" title="Description added" />
          )}
          
          {card.checklist?.length > 0 && (
            <div className={`flex items-center gap-1 text-[11px] font-bold px-1 rounded ${
              card.checklist.every(i => i.completed) ? 'text-emerald-500 bg-emerald-50' : 'text-slate-500'
            }`}>
              <CheckSquare size={14} />
              <span>
                {card.checklist.filter(i => i.completed).length}/{card.checklist.length}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1"></div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            if (window.confirm("Delete this task?")) {
              deleteCard(boardId, listId, card.id);
            }
          }}
          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded"
        >
          <Trash2 size={14} />
        </button>

        <div className="w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[9px] font-bold text-slate-500 shadow-sm">
          U
        </div>
      </div>
    </motion.div>
  );
};

export default Card;