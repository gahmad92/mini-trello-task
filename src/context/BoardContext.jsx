import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 } from "uuid";
import { filter } from "motion/react-client";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  // main state array of all boards
  const [boards, setBoards] = useLocalStorage("nura-task-boards", []);
  // track which board is currently beign active
  const [activeBoardId, setActiveBoardId] = useLocalStorage(
    "active-board-id",
    null,
  );

  // ADDING TEAM MEMBERS STATE--------
  // We use local storage so your team doesn't disappear when you refresh!

  const [members, setMembers] = useLocalStorage("nura-task-members", [
    {
      id: 1,
      name: "Nura AI",
      role: "System assistant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nura",
    },
  ]);

  // Board actions
  const addBoard = (boardData) => {
    const newBoard = {
      id: v4(),
      title: boardData.title,
      color: boardData.color || "bg-blue-500",
      lists: [
        {
          id: v4(),
          title: "To Do",
          cards: [],
          wipLimit: 5,
        },
        {
          id: v4(),
          title: "Done",
          cards: [],
          wipLimit: 10,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
  };
  const deleteBoard = (boardId) => {
    setBoards(boards.filter((b) => b.id !== boardId));
    if (activeBoardId === boardId) {
      setActiveBoardId(null);
    }
  };
  // List actions
  const addList = (boardId, title) => {
    const newList = {
      id: v4(),
      title: title || "New List ",
      cards: [],
      wipLimit: 5, // note it is a default wip limit 5 you can change the limit manuallly
    };
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? { ...board, lists: [...board.lists, newList] }
          : board,
      ),
    );
  };

  const deleteList = (boardId, listId) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.filter((l) => l.id !== listId),
          };
        }
        return board;
      }),
    );
  };
  const renameList = (boardId, listId, newTitle) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            // Fixed: changed .list to .lists
            lists: board.lists.map((l) =>
              l.id === listId ? { ...l, title: newTitle } : l,
            ),
          };
        }
        return board; // Fixed: return single 'board' object
      }),
    );
  };

  // wip limits actions
  const setWipLimit = (boardId, listId, newLimit) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            // Fixed 'list' to 'lists' to match your data structure
            lists: board.lists.map((list) =>
              list.id === listId
                ? { ...list, wipLimit: parseInt(newLimit) || 0 }
                : list,
            ),
          };
        }
        return board;
      }),
    );
  };
  // Cards actions
  const addCard = (boardId, listId, cardTitle) => {
    const newCard = {
      id: v4(),
      title: cardTitle,
      description: "",
      priority: "Medium",
      labels: [],
      checklist: [],
      createdAt: new Date().toISOString(),
      dueDate: null,
      timeLogged: 0,
      isTracking: false,
      // Add this! It helps dnd logic identify the parent list easily
      listId: listId,
    };

    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            // Fixed: changed .list to .lists
            lists: board.lists.map((list) =>
              list.id === listId
                ? { ...list, cards: [...list.cards, newCard] }
                : list,
            ),
          };
        }
        return board;
      }),
    );
  };

  const updateCard = (boardId, listId, cardId, updates) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.map((card) =>
                    card.id === cardId ? { ...card, ...updates } : card,
                  ),
                };
              }
              return list;
            }),
          };
        }
        return board;
      }),
    );
  };

  const deleteCard = (boardId, listId, cardId) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,

            lists: board.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.filter((c) => c.id !== cardId),
                };
              }
              return list;
            }),
          };
        }
        return board;
      }),
    );
  };

  // New member action-------
  const addMember = (name, role) => {
    const newMember = {
      id: v4(),
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setMembers((prev) => [...prev, newMember]);
  };
  const deleteMember = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    // clean this member from all cards it was assigned
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) => ({
            ...card,
            assignedMembers:
              card.assignedMembers?.filter((id) => id !== memberId) || [],
          })),
        })),
      })),
    );
  };

  // Global helper to update everything (Useful for onDragEnd)

  const updateBoardsRaw = (newBoardsArray) => {
    setBoards(newBoardsArray);
  };
  return (
    <BoardContext.Provider
      value={{
        boards,
        members,
        activeBoardId,
        setActiveBoardId,
        addBoard,
        deleteBoard,
        addList,
        deleteList,
        renameList,
        setWipLimit,
        addCard,
        updateCard,
        deleteCard,
        updateBoardsRaw,
        addMember,
        deleteMember
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("use board must be added with new board");
  return context;
};
