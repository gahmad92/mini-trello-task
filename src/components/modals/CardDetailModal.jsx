import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlignLeft,
  CheckSquare,
  Clock,
  AlertCircle,
  RotateCcw,
  Play,
  Tag,
  Plus,
  Users, // Added for members section
  Check, // Added for selection indicator
} from "lucide-react";
import { useBoard } from "../../context/BoardContext";

const CardDetailModal = ({ isOpen, onClose, card, listId, boardId }) => {
  const { updateCard, members } = useBoard(); // Pull members from context

  // Local state for descriptions and checklists
  const [description, setDescription] = useState(card?.description || "");
  const [checklist, setChecklist] = useState(card?.checklist || []);
  const [newItem, setNewItem] = useState("");

  // Local state for custom label creation
  const [newLabelName, setNewLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");

  useEffect(() => {
    if (card) {
      setDescription(card.description || "");
      setChecklist(card.checklist || []);
    }
  }, [card]);

  if (!card) return null;

  const priorities = ["Low", "Medium", "High"];
  const labelColors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-slate-500",
  ];

  // --- MEMBER ASSIGNMENT LOGIC ---
  const toggleMember = (memberId) => {
    const currentAssigned = card.assignedMembers || [];
    const isAlreadyAssigned = currentAssigned.includes(memberId);
    
    const updatedMembers = isAlreadyAssigned
      ? currentAssigned.filter(id => id !== memberId)
      : [...currentAssigned, memberId];

    updateCard(boardId, listId, card.id, { assignedMembers: updatedMembers });
  };

  // --- LABEL LOGIC ---
  const handleCreateLabel = (e) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;
    const newLabel = {
      id: Date.now().toString(),
      name: newLabelName.trim(),
      color: selectedColor,
    };
    const updatedLabels = [...(card.labels || []), newLabel];
    updateCard(boardId, listId, card.id, { labels: updatedLabels });
    setNewLabelName("");
  };

  const removeLabel = (labelId) => {
    const updatedLabels = card.labels.filter((l) => l.id !== labelId);
    updateCard(boardId, listId, card.id, { labels: updatedLabels });
  };

  // --- CHECKLIST LOGIC ---
  const addChecklistItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const updated = [
      ...checklist,
      { id: Date.now(), text: newItem, completed: false },
    ];
    setChecklist(updated);
    updateCard(boardId, listId, card.id, { checklist: updated });
    setNewItem("");
  };

  const toggleItem = (itemId) => {
    const updated = checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item,
    );
    setChecklist(updated);
    updateCard(boardId, listId, card.id, { checklist: updated });
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm text-slate-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* --- HEADER --- */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Task Detail
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {card.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* --- LEFT COLUMN: MAIN CONTENT --- */}
                <div className="md:col-span-2 space-y-10">
                  
                  {/* TIME TRACKER */}
                  <section className="bg-blue-600 rounded-2xl p-6 shadow-xl shadow-blue-100 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                          <Clock size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                            Time Tracked
                          </p>
                          <p className="text-3xl font-mono font-black">
                            {formatTime(card.timeLogged || 0)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-white text-blue-600 p-3 rounded-xl hover:bg-blue-50 shadow-lg transition-all active:scale-95">
                          <Play size={20} fill="currentColor" />
                        </button>
                        <button className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 border border-white/20 transition-all">
                          <RotateCcw size={20} />
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* DESCRIPTION */}
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-800">
                      <AlignLeft size={18} className="text-blue-500" />
                      <h3 className="font-black text-sm uppercase tracking-wider">Description</h3>
                    </div>
                    <textarea
                      className="w-full min-h-[140px] bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                      placeholder="Add a more detailed description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onBlur={() =>
                        updateCard(boardId, listId, card.id, { description })
                      }
                    />
                  </section>

                  {/* CHECKLIST */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-slate-800">
                        <CheckSquare size={18} className="text-blue-500" />
                        <h3 className="font-black text-sm uppercase tracking-wider">Checklist</h3>
                      </div>
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {checklist.filter((i) => i.completed).length} / {checklist.length} DONE
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(checklist.filter((i) => i.completed).length / (checklist.length || 1)) * 100}%`,
                        }}
                        className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      />
                    </div>
                    <div className="space-y-2 mb-4">
                      {checklist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl group transition-all border border-transparent hover:border-slate-100"
                        >
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(item.id)}
                            className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span
                            className={`text-sm flex-1 font-medium ${item.completed ? "line-through text-slate-400" : "text-slate-700"}`}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={addChecklistItem} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a sub-task..."
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all"
                      >
                        Add Task
                      </button>
                    </form>
                  </section>
                </div>

                {/* --- RIGHT COLUMN: SIDEBAR --- */}
                <div className="space-y-10">
                  
                  {/* ASSIGNEES SECTION */}
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                      <Users size={14} /> Assignees
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {members.map((member) => {
                        const isAssigned = card.assignedMembers?.includes(member.id);
                        return (
                          <button
                            key={member.id}
                            onClick={() => toggleMember(member.id)}
                            className="relative group transition-transform active:scale-90"
                            title={member.name}
                          >
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                                isAssigned 
                                  ? 'border-blue-500 ring-4 ring-blue-50' 
                                  : 'border-white opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                              }`} 
                            />
                            {isAssigned && (
                              <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                                <Check size={8} strokeWidth={4} />
                              </div>
                            )}
                            {/* Hover tooltip for name */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                              {member.name}
                            </div>
                          </button>
                        );
                      })}
                      <button 
                        className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50/50"
                        title="Manage Team"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </section>

                  {/* PRIORITY PICKER */}
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                      <AlertCircle size={14} /> Priority
                    </div>
                    <div className="flex flex-col gap-2">
                      {priorities.map((p) => (
                        <button
                          key={p}
                          onClick={() =>
                            updateCard(boardId, listId, card.id, {
                              priority: p,
                            })
                          }
                          className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer text-left flex items-center justify-between ${
                            card.priority === p
                              ? "bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-200"
                              : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {p}
                          {card.priority === p && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* LABELS MANAGEMENT */}
                  <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                      <Tag size={14} /> Labels
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5 min-h-[20px]">
                      {card.labels?.map((label) => (
                        <div
                          key={label.id}
                          className={`${label.color} text-white px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-2 shadow-sm uppercase tracking-tighter`}
                        >
                          {label.name}
                          <X
                            size={12}
                            className="cursor-pointer hover:bg-black/20 rounded-full p-0.5 transition-colors"
                            onClick={() => removeLabel(label.id)}
                          />
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleCreateLabel}
                      className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4 shadow-inner"
                    >
                      <input
                        type="text"
                        placeholder="Label name..."
                        className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={newLabelName}
                        onChange={(e) => setNewLabelName(e.target.value)}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {labelColors.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setSelectedColor(c)}
                              className={`w-5 h-5 rounded-full ${c} transition-all ${selectedColor === c ? "ring-4 ring-white shadow-md scale-125" : "hover:scale-110 opacity-70 hover:opacity-100"}`}
                            />
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-90"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CardDetailModal;