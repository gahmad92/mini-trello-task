import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BoardGallery from "../kanban/BoardGallery";
import BoardView from "../kanban/BoardView";
import { useBoard } from "../../context/BoardContext";
import MembersView from "../members/MembersView";
import DashboardView from "../dashboard/DashboardView"

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("kanban");
  const { activeBoardId } = useBoard();

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* 1. Static Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Navbar */}
        <Navbar />

        {/* 3. Dynamic Content Area */}
        {/* <main className="flex-1 overflow-hidden">
          {activeTab === "kanban" &&
            (activeBoardId ? <BoardView /> : <BoardGallery />)}

          {activeTab === "members" && <MembersView />}

          {activeTab !== "kanban" && activeTab !== "members" && (
            <div className="p-8">
              <h1 className="text-2xl font-bold capitalize">
                {activeTab} Section
              </h1>
              <p className="text-slate-500 mt-2">Coming soon!</p>
            </div>
          )}
        </main> */}
        <main className="flex-1 overflow-hidden">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && <DashboardView />}

          {/* Kanban Tab Logic */}
          {activeTab === "kanban" && (
            activeBoardId ? <BoardView /> : <BoardGallery />
          )}

          {activeTab === "members" && <MembersView />}
          
          {/* Other tabs remain the same... */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
