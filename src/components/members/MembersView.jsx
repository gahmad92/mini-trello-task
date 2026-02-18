import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Trash2,
  X,
  Shield,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useBoard } from "../../context/BoardContext";
import { motion, AnimatePresence } from "framer-motion";

function MembersView() {
  const { members, addMember, deleteMember } = useBoard();

  // local ui state
  const [showAddFrom, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // for members now
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!name.trim(), !role.trim())) return;
    // reset and close
    setName("");
    setRole("");
    showAddFrom(false);
  };
  // for filtering the based on roles and names
  // 1. Derived State: The Filtered List
  // We memoize this so it only recalculates when searchQuery or members changes.
  const filteredMembers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return members;

    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(query) ||
        m.role?.toLowerCase().includes(query),
    );
  }, [members, searchQuery]);

  // 2. Optimized Delete Function
  // useCallback prevents this function from being recreated on every render

  // 3. Optimized Edit/Update Function useCallback

  // do that later
  return (
    <>
      <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto custom-scrollbar">
        {/* header section */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} className="text-blue-500" />
              <span className="text-xs font-black text-blue-500 uppercase tracking-widest">
                Workspace
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Team Management
            </h1>
            <p className="text-slate-500 mt-1">
              Create custom roles and manage access for your collaborators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <UserPlus size={18} />
              Add Member
            </button>
          </div>
        </div>

        {/* --- ADD MEMBER FORM --- */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-sm">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                      Custom Role
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Senior UI Architect"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                    >
                      Confirm Invite
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MEMBERS TABLE --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Team Member
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Custom Role
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="group hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Mail size={12} />
                          <span>
                            {member.name.toLowerCase().replace(/\s/g, ".")}
                            @nuratask.com
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase">
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold border border-slate-200">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => deleteMember && deleteMember(member.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">
                No members found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MembersView;
