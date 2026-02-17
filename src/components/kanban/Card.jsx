import React from 'react';
import { Clock, AlignLeft, CheckSquare, Trash2 } from 'lucide-react';
import { useBoard } from '../../context/BoardContext';
import { motion } from 'framer-motion';

const Card = ({ card, listId, boardId }) => {
  const { deleteCard } = useBoard();

  const priorityColors = {
    High: 'bg-rose-100 text-rose-600 border-rose-200',
    Medium: 'bg-amber-100 text-amber-600 border-amber-200',
    Low: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer group relative"
    >
      {/* Priority Badge */}
      <div className={`text-[10px] font-bold px-2 py-0.5 rounded border w-fit mb-2 ${priorityColors[card.priority]}`}>
        {card.priority}
      </div>

      <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-3">
        {card.title}
      </h4>

      {/* Card Info/Badges */}
      <div className="flex items-center gap-3 text-slate-400">
        {card.description && <AlignLeft size={14} title="This card has a description." />}
        
        {card.checklist?.length > 0 && (
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <CheckSquare size={14} />
            <span>
              {card.checklist.filter(i => i.completed).length}/{card.checklist.length}
            </span>
          </div>
        )}

        <div className="flex-1"></div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Don't open modal when deleting
            deleteCard(boardId, listId, card.id);
          }}
          className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Profile/Assignee circle (Mock for now) */}
      <div className="mt-3 pt-3 border-t border-slate-50 flex justify-end">
        <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
          U
        </div>
      </div>
    </motion.div>
  );
};

export default Card;