import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import { Plus, ArrowLeft, Users, Filter } from 'lucide-react';
import List from './List';
import { motion } from 'framer-motion';
import CardDetailModal from '../modals/CardDetailModal';

const BoardView = () => {
  const { boards, activeBoardId, setActiveBoardId, addList } = useBoard();
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  
  // State to track which card is currently being edited in the modal
  const [selectedCard, setSelectedCard] = useState(null); // format: { card, listId }

  // 1. Grab the current board data
  const board = boards.find((b) => b.id === activeBoardId);

  // If no board is active (or deleted), don't render
  if (!board) return null;

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      addList(board.id, newListTitle);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-slate-50">
      {/* --- BOARD HEADER --- */}
      <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveBoardId(null)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{board.title}</h2>
            <p className="text-xs text-slate-400">Created on {new Date(board.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Users size={16} /> Members
          </button>
          <div className={`w-3 h-3 rounded-full ${board.color} border-2 border-white shadow-sm`}></div>
        </div>
      </header>

      {/* --- KANBAN SCROLL AREA --- */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 flex gap-6 items-start custom-scrollbar">
        {/* Render existing lists */}
        {board.lists.map((list) => (
          <List 
            key={list.id} 
            list={list} 
            boardId={board.id} 
            // This function is passed to List -> Card
            onCardClick={(card) => setSelectedCard({ card, listId: list.id })} 
          />
        ))}

        {/* --- ADD NEW LIST BUTTON / INPUT --- */}
        <div className="min-w-[280px]">
          {isAddingList ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-3 rounded-xl shadow-md border border-blue-200"
            >
              <form onSubmit={handleAddList}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter list title..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                />
                <div className="flex items-center gap-2 mt-3">
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700">
                    Add List
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingList(false)}
                    className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <button 
              onClick={() => setIsAddingList(true)}
              className="w-full h-12 flex items-center justify-center gap-2 bg-slate-200/50 hover:bg-slate-200 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium transition-all group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
              Add New List
            </button>
          )}
        </div>
      </div>

      {/* --- GLOBAL CARD DETAIL MODAL --- */}
      <CardDetailModal 
        isOpen={!!selectedCard} 
        onClose={() => setSelectedCard(null)}
        card={selectedCard?.card}
        listId={selectedCard?.listId}
        boardId={board.id}
      />
    </div>
  );
};

export default BoardView;