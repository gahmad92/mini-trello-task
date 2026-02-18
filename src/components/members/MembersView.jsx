import React, { useState, useMemo, useCallback } from "react";
import {
  UserPlus,
  Search,
  Trash2,
  X,
  Shield,
  Mail,
} from "lucide-react";
import { useBoard } from "../../context/BoardContext";
import { motion, AnimatePresence } from "framer-motion";

function MembersView() {
  const { members, addMember, deleteMember } = useBoard();

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // --- 1. Robust Add Member Logic ---
 const handleSubmit = (e) => {
  e.preventDefault();
  const cleanName = name.trim();
  const cleanRole = role.trim();

  if (!cleanName || !cleanRole) return;

  // Let the Context handle the v4 ID generation and Avatar creation
  addMember(cleanName, cleanRole); 
  
  setName("");
  setRole("");
  setShowAddForm(false);
};

  // --- 2. Memoized Filter (Industry Standard) ---
  const filteredMembers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return members;

    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(query) ||
        m.role?.toLowerCase().includes(query)
    );
  }, [members, searchQuery]);

  // --- 3. Optimized Delete ---
  const handleDelete = useCallback((id) => {
    if (window.confirm("Remove this member from the workspace?")) {
      deleteMember(id);
    }
  }, [deleteMember]);

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-blue-500" />
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Workspace</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Team Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none w-64 shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
          >
            <UserPlus size={18} /> Add Member
          </button>
        </div>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-sm">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Role (e.g. Developer)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-all">
                    Save Member
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200">
                    <X size={24} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Member</th>
              <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="group hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={member.avatar} alt="" className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-800">{member.name || "Unknown Member"}</p>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <Mail size={12} />
                        {/* SAFE EMAIL LOGIC: Optional chaining + fallback */}
                        <span>{(member.name?.toLowerCase().replace(/\s/g, ".") || "user")}@nuratask.com</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold border border-slate-200">
                    {member.role || "No Role"}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembersView;