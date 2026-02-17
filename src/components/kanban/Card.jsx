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

  // Helper to format the time display on the card face
  const formatTime = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    return mins > 0 ? `${mins}m` : `${seconds}s`;
  };

  return (
    <motion.div
      layoutId={card.id} // Smooth transition if we add drag and drop later
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer group relative transition-shadow"
    >
      {/* Top Row: Priority & Timer Indicator */}
      <div className="flex justify-between items-start mb-2">
        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityColors[card.priority]}`}>
          {card.priority}
        </div>
        {card.timeLogged > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
            <Clock size={10} />
            {formatTime(card.timeLogged)}
          </div>
        )}
      </div>

      <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
        {card.title}
      </h4>

      {/* Card Info/Badges */}
      <div className="flex items-center gap-3 text-slate-400">
        {card.description && (
          <AlignLeft size={14} className="text-slate-400" title="This card has a description." />
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

        <div className="flex-1"></div>
        
        {/* Delete Button with stopPropagation to avoid opening the modal */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteCard(boardId, listId, card.id);
            }
          }}
          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Footer: User Avatar */}
      <div className="mt-3 pt-3 border-t border-slate-50 flex justify-end">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
          U
        </div>
      </div>
    </motion.div>
  );
};

export default Card;