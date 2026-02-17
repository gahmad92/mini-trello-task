import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, AlignLeft, CheckSquare, Clock, AlertCircle, 
  Trash2, Play, Pause, RotateCcw, Plus 
} from 'lucide-react';
import { useBoard } from '../../context/BoardContext';

const CardDetailModal = ({ isOpen, onClose, card, listId, boardId }) => {
  const { updateCard } = useBoard();
  
  // Local state for editing to avoid constant Context updates while typing
  const [description, setDescription] = useState(card?.description || '');
  const [checklist, setChecklist] = useState(card?.checklist || []);
  const [newItem, setNewItem] = useState('');

  // Sync local state when card changes
  useEffect(() => {
    if (card) {
      setDescription(card.description);
      setChecklist(card.checklist);
    }
  }, [card]);

  if (!card) return null;

  // --- CHECKLIST LOGIC ---
  const addChecklistItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const updated = [...checklist, { id: Date.now(), text: newItem, completed: false }];
    setChecklist(updated);
    updateCard(boardId, listId, card.id, { checklist: updated });
    setNewItem('');
  };

  const toggleItem = (itemId) => {
    const updated = checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    updateCard(boardId, listId, card.id, { checklist: updated });
  };

  // --- TIME TRACKING (FORMATTING) ---
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* --- HEADER --- */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Task Detail</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{card.title}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
              
              {/* --- TIME TRACKER SECTION --- */}
              <section className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Time Tracked</p>
                      <p className="text-3xl font-mono font-bold text-blue-700">{formatTime(card.timeLogged)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
                      <Play size={20} fill="currentColor" />
                    </button>
                    <button className="bg-white text-slate-400 p-3 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all">
                      <RotateCcw size={20} />
                    </button>
                  </div>
                </div>
              </section>

              {/* --- DESCRIPTION --- */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-slate-700">
                  <AlignLeft size={18} />
                  <h3 className="font-bold">Description</h3>
                </div>
                <textarea 
                  className="w-full min-h-[120px] bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Add a more detailed description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => updateCard(boardId, listId, card.id, { description })}
                />
              </section>

              {/* --- CHECKLIST --- */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckSquare size={18} />
                    <h3 className="font-bold">Checklist</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {checklist.filter(i => i.completed).length} / {checklist.length} Completed
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(checklist.filter(i => i.completed).length / (checklist.length || 1)) * 100}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  {checklist.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg group transition-all">
                      <input 
                        type="checkbox" 
                        checked={item.completed}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className={`text-sm flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={addChecklistItem} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add an item..."
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 transition-all">
                    Add
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CardDetailModal;