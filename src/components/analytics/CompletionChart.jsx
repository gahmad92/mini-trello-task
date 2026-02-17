import React from 'react';
import { useBoard } from '../../context/BoardContext';

const CompletionChart = () => {
  const { boards } = useBoard();

  // Logic: Calculate total cards vs. cards in "Done" lists
  const allCards = boards.flatMap(b => b.lists.flatMap(l => l.cards));
  const doneCards = allCards.filter(c => {
    // We assume any list with "Done" in the title is a completed list
    const parentList = boards.flatMap(b => b.lists).find(l => l.cards.includes(c));
    return parentList?.title.toLowerCase().includes('done');
  });

  const percentage = allCards.length > 0 
    ? Math.round((doneCards.length / allCards.length) * 100) 
    : 0;

  // SVG Math for the circle
  const stroke = 8;
  const radius = 50;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
      <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Overall Completion</h3>
      
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <circle
            stroke="#2563eb"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <span className="absolute text-xl font-black text-slate-800">{percentage}%</span>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400 font-medium">
          {doneCards.length} of {allCards.length} tasks finished
        </p>
      </div>
    </div>
  );
};

export default CompletionChart;