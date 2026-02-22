import React from "react";
import { Clock, AlignLeft, CheckSquare, Trash2 } from "lucide-react";
import { useBoard } from "../../context/BoardContext";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const Card = ({ card, listId, boardId, onClick }) => {
  const { deleteCard, members } = useBoard(); // Get global members list

  const priorityColors = {
    High: "bg-rose-100 text-rose-600 border-rose-200",
    Medium: "bg-amber-100 text-amber-600 border-amber-200",
    Low: "bg-emerald-100 text-emerald-600 border-emerald-200",
  };

  const formatTime = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    return mins > 0 ? `${mins}m` : `${seconds}s`;
  };

  // NEW: Filter the global members to find only those assigned to this specific card
  const assignedData = members.filter((m) =>
    card.assignedMembers?.includes(m.id),
  );

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
            <div className="h-1.5 w-6 bg-slate-100 rounded-full" />
          )}
        </div>

        <div
          className={`text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded border ${priorityColors[card.priority] || priorityColors.Medium}`}
        >
          {card.priority || "Medium"}
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

      {/* --- CARD FOOTER: ASSIGNEES & BADGES --- */}
      <div className="flex items-center justify-between mt-4">
        {/* LEFT: Overlapping Avatars */}
        <div className="flex -space-x-2 overflow-hidden">
          {assignedData.length > 0 ? (
            assignedData.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover bg-slate-100"
              />
            ))
          ) : (
            // Tiny placeholder if no one is assigned
            <div className="h-6 w-6 rounded-full border border-dashed border-slate-200 flex items-center justify-center text-[8px] text-slate-300 font-bold">
              ?
            </div>
          )}
        </div>

        {/* RIGHT: Checklist/Description Icons + Delete Button */}
        <div className="flex items-center gap-2">
          {/* --- NEW: DATE BADGE --- */}
          {card.dueDate && (
            <div
              className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                new Date(card.dueDate) < new Date().setHours(0, 0, 0, 0)
                  ? "bg-rose-50 text-rose-500 border-rose-100" // Overdue
                  : "bg-slate-50 text-slate-500 border-slate-100" // Upcoming
              }`}
            >
              <Calendar size={10} />
              <span>
                {new Date(card.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {card.description && (
            <AlignLeft size={14} className="text-slate-300" />
          )}
          {card.description && (
            <AlignLeft size={14} className="text-slate-300" />
          )}

          {card.checklist?.length > 0 && (
            <div
              className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                card.checklist.every((i) => i.completed)
                  ? "text-emerald-500 bg-emerald-50"
                  : "text-slate-400 bg-slate-50"
              }`}
            >
              <CheckSquare size={12} />
              <span>
                {card.checklist.filter((i) => i.completed).length}/
                {card.checklist.length}
              </span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Delete this task?")) {
                deleteCard(boardId, listId, card.id);
              }
            }}
            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-1 p-1 hover:bg-red-50 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
