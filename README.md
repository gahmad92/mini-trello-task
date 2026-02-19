# 📋 Mini Trello - Task Management Application

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
