import React, { useMemo, useState } from "react";
import { useBoard } from "../../context/BoardContext";
import CompletionChart from "../analytics/CompletionChart";
import {
  Search,
  Clock,
  CheckCircle,
  Layers,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";

const DashboardView = () => {
  const { boards, members } = useBoard();
  const [searchQuery, setSearchQuery] = useState("");

  // 1. DATA ENGINE: Process all boards into stats and lists
  const allData = useMemo(() => {
    const cards = [];
    const stats = { totalTime: 0, completed: 0 };
    const distribution = {};

    boards.forEach((board) => {
      board.lists?.forEach((list) => {
        // Track distribution for the chart
        distribution[list.title] =
          (distribution[list.title] || 0) + list.cards.length;

        list.cards.forEach((card) => {
          if (list.title.toLowerCase() === "done") stats.completed++;
          stats.totalTime += card.timeLogged || 0;

          cards.push({
            ...card,
            boardTitle: board.title,
            boardColor: board.color,
          });
        });
      });
    });

    const today = new Date().setHours(0, 0, 0, 0);
    const upcoming = cards
      .filter((c) => c.dueDate && new Date(c.dueDate) >= today)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    return {
      cards,
      stats,
      upcoming,
      chartData: Object.keys(distribution).map((name) => ({
        name,
        value: distribution[name],
      })),
    };
  }, [boards]);

  // 2. SEARCH ENGINE: Filter cards based on user input
  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    return allData.cards
      .filter(
        (card) =>
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.boardTitle.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 5);
  }, [allData.cards, searchQuery]);

  return (
    /* The Scroll Fix: h-full and overflow-y-auto */
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800">
              NuraTask Dashboard
            </h1>
            <p className="text-slate-500 text-sm">
              Real-time productivity overview
            </p>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks or boards..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Instant Search Results Dropdown */}
            {searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {filteredResults.map((res) => (
                  <div
                    key={res.id}
                    className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none flex justify-between items-center"
                  >
                    <span className="text-sm font-bold text-slate-700">
                      {res.title}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase">
                      {res.boardTitle}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 1. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Tasks/ cards"
            value={allData.cards.length}
            icon={<Layers />}
            color="blue"
          />
          <StatCard
            label="Tasks Completed"
            value={allData.stats.completed}
            icon={<CheckCircle />}
            color="emerald"
          />
          <StatCard
            label="Team Members"
            value={members.length}
            icon={<Users />}
            color="amber"
          />
          <StatCard
            label="Active Boards"
            value={boards.length}
            icon={<Layers />}
            color="purple"
          />
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Workflow Distribution
              </h2>
              <p className="text-xs text-slate-400">
                Total tasks by list status
              </p>
            </div>
            <CompletionChart data={allData.chartData} />
          </div>

          {/* Upcoming Dates Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-blue-500" /> Upcoming dates
            </h2>
            <div className="space-y-4">
              {allData.upcoming.map((card) => (
                <div
                  key={card.id}
                  className="group p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-slate-700 truncate pr-2">
                      {card.title}
                    </span>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {new Date(card.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${card.boardColor}`}
                    />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                      {card.boardTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Sub-component for UI Cleanliness
const StatCard = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default DashboardView;
