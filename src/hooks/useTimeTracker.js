import { useState, useEffect, useRef } from 'react';
import { useBoard } from '../context/BoardContext';

export const useTimeTracker = (boardId, listId, cardId, initialTime, isRunning) => {
  const { updateCard } = useBoard();
  const [seconds, setSeconds] = useState(initialTime);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          const nextValue = prev + 1;
          // Auto-sync to context every 10 seconds to save progress
          if (nextValue % 10 === 0) {
            updateCard(boardId, listId, cardId, { timeLogged: nextValue });
          }
          return nextValue;
        });
      }, 1000);
    } else {
      // Save final time when stopped
      if (timerRef.current) {
        updateCard(boardId, listId, cardId, { timeLogged: seconds });
        clearInterval(timerRef.current);
      }
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, boardId, listId, cardId, updateCard]);

  return seconds;
};