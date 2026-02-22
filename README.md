# 📋 Mini Trello - Task Management Application
https://kanban-nura.netlify.app/

A modern, feature-rich Kanban board application built with React and Vite. Manage multiple boards, track team members, log time, and organize tasks with a drag-and-drop interface. All data is persisted to browser localStorage for seamless offline functionality.

[![GitHub](https://img.shields.io/badge/GitHub-gahmad92%2Fmini--trello--task-black?logo=github)](https://github.com/gahmad92/mini-trello-task.git)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-06B6D4?logo=tailwindcss)

---

## 🎯 Features

### Core Kanban Functionality
- ✅ **Multiple Boards** - Create and manage multiple project boards with unique colors
- ✅ **Customizable Lists** - Add, rename, and delete lists with WIP (Work In Progress) limits
- ✅ **Drag & Drop** - Intuitive drag-and-drop interface using `@hello-pangea/dnd` for seamless task organization
- ✅ **Card Management** - Create, edit, update, and delete cards with rich details

### Advanced Card Features
- 📝 **Card Details** - Add descriptions using rich text editor (React Quill)
- 🏷️ **Priority Levels** - Set task priority (High, Medium, Low) with color-coded badges
- 🏷️ **Labels & Tags** - Organize cards with customizable label system
- ✅ **Checklists** - Track sub-tasks with completion status
- 📅 **Due Dates** - Set and track task deadlines with date picker
- ⏱️ **Time Tracking** - Log and track time spent on tasks with real-time timer
- 👥 **Member Assignment** - Assign multiple team members to cards with avatar display

### Team Management
- 👤 **Team Members** - Add, manage, and delete team members
- 🎨 **Auto-generated Avatars** - Dynamic avatar generation using DiceBear API
- 🔗 **Member Assignment** - Assign members to tasks with visual representation
- 📊 **Member Overview** - View all team members in dedicated view

### Analytics & Insights
- 📊 **Completion Chart** - Visual representation of task completion metrics
- 📈 **Progress Tracking** - Monitor board and list progress at a glance
- 📉 **Analytics Dashboard** - Comprehensive view of project statistics

### Data Persistence
- 💾 **Browser Storage** - All data persisted to localStorage automatically
- 🔄 **Real-time Sync** - Changes saved instantly without manual refresh
- 🚀 **Offline First** - Full functionality without internet connection

---

## 🛠️ Tech Stack

### Frontend Framework
- **React** (19.2.0) - UI library with modern hooks
- **Vite** (8.0.0-beta.13) - Lightning-fast build tool
- **React DOM** (19.2.0) - React rendering library

### Styling & UI
- **TailwindCSS** (4.1.18) - Utility-first CSS framework
- **@tailwindcss/vite** (4.1.18) - Vite integration for TailwindCSS
- **Lucide React** (0.564.0) - Beautiful, consistent icon library
- **React Icons** (5.5.0) - Popular icon sets (FontAwesome, Feather, etc.)

### Drag & Drop
- **@hello-pangea/dnd** (18.0.1) - Accessible drag-and-drop library (Beautifully DnD fork)

### Data & State Management
- **UUID** (13.0.0) - Generate unique identifiers for boards, lists, and cards
- **Context API** - Built-in React state management
- **Browser LocalStorage** - Persistent data storage

### Form & Content
- **React DatePicker** (9.1.0) - Date selection component
- **React Quill New** (3.8.3) - Rich text editor for card descriptions
- **date-fns** (4.1.0) - Date utility library

### Animation
- **Motion** (12.34.0) - Framer Motion for smooth animations and transitions

### Development Tools
- **ESLint** (9.39.1) - Code quality and style checking
- **@vitejs/plugin-react-swc** (4.2.2) - Fast refresh with SWC

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/gahmad92/mini-trello-task.git
cd mini-trello

### Step 2 install the Dependencies
npm install
### Step 3 run the project
npm run dev
### Step 4 Build for production
npm run build

mini-trello — Project Structure

mini-trello/
├── src/
│   ├── components/
│   │   ├── analytics/
│   │   │   └── CompletionChart.jsx          # Task completion visualization
│   │   ├── kanban/
│   │   │   ├── BoardGallery.jsx             # Board selection/creation view
│   │   │   ├── BoardView.jsx                # Active board display
│   │   │   ├── Card.jsx                     # Individual card component
│   │   │   └── List.jsx                     # Column/list component
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx               # Main layout wrapper
│   │   │   ├── Navbar.jsx                   # Top navigation bar
│   │   │   └── Sidebar.jsx                  # Side navigation menu
│   │   ├── members/
│   │   │   └── MembersView.jsx              # Team member management
│   │   ├── modals/
│   │   │   └── CardDetailModal.jsx          # Card editing modal
│   │   └── shared/
│   │       └── Button.jsx                   # Reusable button component
│   ├── context/
│   │   └── BoardContext.jsx                 # Global state management
│   ├── hooks/
│   │   ├── useLocalStorage.js               # LocalStorage persistence hook
│   │   └── useTimeTracker.js                # Time tracking hook
│   ├── utils/
│   │   └── helpers.js                       # Utility functions
│   ├── App.jsx                              # Root component
│   ├── App.css                              # Global styles
│   ├── main.jsx                             # Entry point
│   └── index.css                            # Base styles
├── public/                                   # Static assets
├── index.html                               # HTML template
├── vite.config.js                           # Vite configuration
├── eslint.config.js                         # ESLint configuration
├── tailwind.config.js                       # TailwindCSS configuration
├── package.json                             # Dependencies and scripts
└── README.md                                # This file






this appplication uses a localstorage hook useLocalStorage
localstorage keys --
// Stores all boards with their lists and cards
"nura-task-boards"

// Stores the currently active board ID
"active-board-id"

// Stores all team members
"nura-task-members"
🎮 Context API & State Management
BoardContext
Central state management using React Context API. Provides all board, list, card, and member operations.

Available Methods
const {
  // State
  boards,                    // Array of all boards
  activeBoardId,            // Currently active board
  members,                  // Array of team members
  
  // Board Actions
  addBoard(boardData)       // Create new board
  deleteBoard(boardId)      // Remove board
  
  // List Actions
  addList(boardId, title)                    // Add list to board
  deleteList(boardId, listId)                // Remove list
  renameList(boardId, listId, newTitle)      // Update list title
  setWipLimit(boardId, listId, newLimit)     // Set WIP limit
  
  // Card Actions
  addCard(boardId, listId, cardTitle)        // Create card
  updateCard(boardId, listId, cardId, updates) // Update card
  deleteCard(boardId, listId, cardId)        // Remove card
  
  // Member Actions
  addMember(name, role)     // Add team member
  deleteMember(memberId)    // Remove member
  
  // Advanced
  updateBoardsRaw(newBoardsArray) // Direct board array update (for drag-drop)
} = useBoard();

import { useBoard } from '../context/BoardContext';

function MyComponent() {
  const { boards, addBoard } = useBoard();
  
  const handleCreateBoard = () => {
    addBoard({
      title: "New Project",
      color: "bg-purple-500"
    });
  };
  
  return (
    <button onClick={handleCreateBoard}>
      Create Board
    </button>
  );
}

🎨 Components Overview
Layout Components
MainLayout.jsx
Master layout component that manages tab navigation and content switching.

Renders Sidebar for navigation
Displays Navbar for top-level controls
Shows appropriate content based on active tab (kanban, members, analytics)
Navbar.jsx
Top navigation bar with board information and actions.

Sidebar.jsx
Side navigation menu for switching between views (Kanban, Members, Analytics).

Kanban Components
ardGallery.jsx
Displays all available boards and allows board selection/creation.

Shows board cards with preview
Create new board interface
Board color selection
BoardView.jsx
Main view for active board with drag-and-drop interface.

Renders all lists
Handles drag-and-drop operations
Shows list WIP limits
List.jsx
Column component containing cards within a list.
Displays all cards in list
Drop zone for drag-and-drop
Add card interface
List controls (rename, delete, set WIP limit)
Card.jsx
Individual task card component.

Displays card title and priority
Shows assigned members
Time tracking indicator
Checklist progress
Click to open detail modal
Modal Components
CardDetailModal.jsx
Detailed card editing interface with:

Card title editing
Description with rich text editor
Priority selection
Label management
Checklist creation and tracking
Due date picker
Time tracking controls
Member assignment
Delete card option
eature Components
CompletionChart.jsx
Analytics component showing task completion metrics with visual charts.

MembersView.jsx
Team member management interface:

Add new members
View member list
Delete members
Member role assignment

DATA FLOW=---------
User Action
    ↓
Component Event Handler
    ↓
BoardContext Action Method
    ↓
setBoards/setMembers (via useLocalStorage)
    ↓
State Update + LocalStorage Sync
    ↓
Component Re-render

📄 License
This project is open source and available under the MIT License.

🔗 Resources
React Documentation
Vite Guide
TailwindCSS Docs
DnD Documentation
Lucide Icons
📞 Support
For issues and suggestions, please open an issue on GitHub.

Built with ❤️ using React, Vite, and TailwindCSS
Last Updated: February 20, 2026
