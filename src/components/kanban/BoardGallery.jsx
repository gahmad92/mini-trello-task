import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoard } from '../../context/BoardContext';

const colors = [
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Purple', class: 'bg-purple-600' },
  { name: 'Emerald', class: 'bg-emerald-500' },
  { name: 'Rose', class: 'bg-rose-500' },
  { name: 'Amber', class: 'bg-amber-500' },
  { name: 'Slate', class: 'bg-slate-700' },
];

const BoardGallery = () => {
  const { boards, addBoard, setActiveBoardId } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0].class);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    addBoard({ title: newBoardTitle, color: selectedColor });
    setNewBoardTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Boards</h1>
          <p className="text-slate-500 text-sm">Create and manage your custom workspaces</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all transform active:scale-95"
        >
          <Plus size={20} /> Create New Board
        </button>
      </header>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {boards.map((board) => (
          <motion.div
            layoutId={board.id}
            whileHover={{ y: -5, filter: "brightness(1.1)" }}
            key={board.id}
            onClick={() => setActiveBoardId(board.id)}
            className={`h-36 rounded-2xl p-5 cursor-pointer text-white shadow-xl ${board.color} flex flex-col justify-between relative group`}
          >
            <h3 className="text-lg font-bold leading-tight">{board.title}</h3>
            <span className="text-xs bg-white/20 w-fit px-2 py-1 rounded backdrop-blur-md">
              {board.lists?.length || 0} Lists
            </span>
          </motion.div>
        ))}
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">New Board</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Board Title</label>
                  <input 
                    autoFocus
                    type="text" 
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    placeholder="e.g. Marketing Launch"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Background Color</label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.class}
                        type="button"
                        onClick={() => setSelectedColor(c.class)}
                        className={`w-10 h-10 rounded-full ${c.class} flex items-center justify-center transition-all ${selectedColor === c.class ? 'ring-4 ring-offset-2 ring-blue-400' : ''}`}
                      >
                        {selectedColor === c.class && <Check size={18} className="text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-blue-200 shadow-lg hover:bg-blue-700 transition-all"
                >
                  Create Board
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardGallery;