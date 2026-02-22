import React, { useMemo, useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import CompletionChart from '../analytics/CompletionChart';
import { Search, Clock, CheckCircle, Layers } from 'lucide-react';

const DashboardView = () => {
  const { boards } = useBoard();
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Flatten all cards from all boards for global access
  const allData = useMemo(() => {
    const cards = [];
    const stats = { totalTime: 0, completed: 0 };
    const distribution = {};

    boards.forEach(board => {
      board.lists.forEach(list => {
        // Track distribution for the chart
        distribution[list.title] = (distribution[list.title] || 0) + list.cards.length;
        
        list.cards.forEach(card => {
          if (list.title.toLowerCase() === 'done') stats.completed++;
          stats.totalTime += (card.timeLogged || 0);
          
          cards.push({
            ...card,
            boardTitle: board.title,
            listTitle: list.title,
            boardColor: board.color
          });
        });
      });
    });

    return { 
      cards, 
      stats, 
      chartData: Object.keys(distribution).map(name => ({ name, value: distribution[name] }))
    };
  }, [boards]);

  // 2. Filter logic for the Search Bar
  const filteredResults = useMemo(() => {
    return allData.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.boardTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6); // Limit to top 6 results for performance
  }, [allData.cards, searchQuery]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Global Dashboard</h1>
          <p className="text-slate-500">Overview of all active workspaces</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search tasks or boards..."
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Hours Tracked" value={`${(allData.stats.totalTime / 3600).toFixed(1)}h`} icon={<Clock />} color="blue" />
        <StatCard label="Tasks Done" value={allData.stats.completed} icon={<CheckCircle />} color="emerald" />
        <StatCard label="Active Boards" value={boards.length} icon={<Layers />} color="purple" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold mb-6">Task Distribution</h2>
          <CompletionChart data={allData.chartData} type="bar" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Search Results</h2>
          <div className="space-y-3">
            {filteredResults.map(card => (
              <div key={card.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-sm text-slate-800">{card.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${card.boardColor}`}></span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{card.boardTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Small Component for Cleanliness
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default DashboardView;