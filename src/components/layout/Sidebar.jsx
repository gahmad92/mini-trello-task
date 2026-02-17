import React from "react";
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { useBoard } from "../../context/BoardContext";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { id: "kanban", label: "Kanban Board", icon: <Kanban size={20} /> },
  { id: "members", label: "Members", icon: <Users size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { setActiveBoardId } = useBoard();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Logic: If user clicks Kanban in sidebar, reset to Gallery view (null board)
    if (tabId === 'kanban') {
      setActiveBoardId(null);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full z-20">
      {/* Brand Logo */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Kanban size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            NuraTask
          </h2>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-blue-400" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: User/Logout */}
      <div className="p-4 mt-auto border-t border-slate-100">
        <button className="flex items-center gap-3 text-slate-400 px-4 py-3 hover:text-red-500 hover:bg-red-50 w-full rounded-xl transition-all font-bold text-sm">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;