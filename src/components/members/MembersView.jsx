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
  const [showAddFrom, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // for members now
  const [name,setName] = useState("")
  const [role, setRole] = useState("")

  // functions
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!name.trim(), !role.trim()) return
    // reset and close
    setName("")
    setRole("")
    showAddFrom(false)
  }
  // for filtering the based on roles and names 
  // 1. Derived State: The Filtered List
// We memoize this so it only recalculates when searchQuery or members changes.
const filteredMembers = useMemo(() => {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return members;

  return members.filter((m) =>
    m.name?.toLowerCase().includes(query) ||
    m.role?.toLowerCase().includes(query)
  );
}, [members, searchQuery]);

// 2. Optimized Delete Function
// useCallback prevents this function from being recreated on every render


// 3. Optimized Edit/Update Function useCallback

// do that later 
  return <></>;
}

export default MembersView;
