import React, { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { useBoard } from '../../context/BoardContext';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const List = ({ list, boardId, onCardClick }) => {
  const { addCard, deleteList, renameList } = useBoard();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);

  const cardCount = list.cards.length;
  const isOverLimit = list.wipLimit > 0 && cardCount > list.wipLimit;

  const handleAddCard = (e) => {
    e.preventDefault();
    if (cardTitle.trim()) {
      addCard(boardId, list.id, cardTitle);
      setCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleRename = () => {
    if (listTitle.trim() && listTitle !== list.title) {
      renameList(boardId, list.id, listTitle);
    }
    setIsEditingTitle(false);
  };

  return (
    <div className={`flex flex-col min-w-[300px] max-w-[300px] h-fit max-h-full rounded-2xl transition-all duration-300 ${
      isOverLimit ? 'bg-red-50 ring-2 ring-red-400 shadow-lg shadow-red-100' : 'bg-slate-100 border border-slate-200'
    }`}>
      
      {/* --- LIST HEADER --- */}
      <div className="p-4 flex justify-between items-start group">
        <div className="flex-1">
          {isEditingTitle ? (
            <input 
              autoFocus
              className="w-full bg-white px-2 py-1 rounded border border-blue-400 outline-none text-sm font-bold shadow-sm"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            />
          ) : (
            <h3 
              onClick={() => setIsEditingTitle(true)}
              className="font-bold text-slate-700 cursor-text hover:text-blue-600 transition-colors truncate pr-2"
              title="Click to rename"
            >
              {list.title}
            </h3>
          )}
          
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm transition-colors ${
              isOverLimit ? 'bg-red-500 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              {cardCount} / {list.wipLimit}
            </span>
            {isOverLimit && <span className="text-[10px] text-red-500 font-bold animate-pulse">OVER LIMIT</span>}
          </div>
        </div>
        
        <button 
          onClick={() => {
            if(window.confirm(`Delete "${list.title}" and all its cards?`)) {
              deleteList(boardId, list.id);
            }
          }}
          className="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* --- DRAGGABLE CARDS CONTAINER --- */}
      <Droppable droppableId={list.id} type="card">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 overflow-y-auto px-3 pb-2 space-y-3 custom-scrollbar min-h-[100px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-slate-200/50 rounded-lg' : ''
            }`}
          >
            {list.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, dragSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      // Prevents weird tilt on some browsers during drag
                      userSelect: 'none'
                    }}
                  >
                    <Card 
                      card={card} 
                      listId={list.id} 
                      boardId={boardId} 
                      onClick={() => onCardClick(card)} 
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* --- ADD CARD FOOTER --- */}
      <div className="p-2">
        <AnimatePresence>
          {isAddingCard ? (
            <motion.form 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleAddCard} 
              className="bg-white p-3 rounded-xl shadow-sm border border-blue-200"
            >
              <textarea
                autoFocus
                placeholder="What needs to be done?"
                className="w-full text-sm border-none focus:ring-0 resize-none p-0 h-16 text-slate-700 placeholder:text-slate-400 outline-none"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddCard(e);
                  }
                }}
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                <button 
                  type="submit" 
                  disabled={!cardTitle.trim()}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                  Add Card
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAddingCard(false)} 
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.form>
          ) : (
            <button 
              onClick={() => setIsAddingCard(true)}
              className="w-full flex items-center gap-2 p-3 text-slate-500 hover:bg-slate-200/60 rounded-xl transition-all text-sm font-medium group"
            >
              <Plus size={18} className="group-hover:text-blue-600" /> 
              <span className="group-hover:text-slate-700">Add a card</span>
            </button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default List;