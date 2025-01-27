import logo from "@/assets/logo.png";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getInitials } from "@/utils/utils";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Ellipsis, Folder, MessageSquare, Plus, Search } from "lucide-react";
import { useState } from "react";
import AccountSettingsDialog from "./dialogs/AccountSettingsDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { createChat, setActiveChat } from "@/store/slices/chatSlice";
import { RootState } from "@/store";

const Sidebar = () => {
  const { profile, loading } = useUserProfile();
  const [isExpanded, setIsExpanded] = useState(true);

  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);

  const handleNewChat = () => {
    dispatch(createChat());
  };

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  // Mock data for demonstration
  const categories = [
    { name: "Sales", count: 3, color: "white" },
    { name: "Marketing", count: 5, color: "white" },
    { name: "Negotiation", count: 2, color: "white" },
  ];

  // const recentChats = [
  //   { id: 1, title: "Marketing Strategy Q4 2023 Presentation", date: "2h ago" },
  //   { id: 2, title: "Sales Pitch Review session", date: "5h ago" },
  //   { id: 3, title: "Email Campaign Ideas for Q1 2024", date: "1d ago" },
  //   { id: 4, title: "The Future of Marketing as a Sales Tool", date: "1d ago" },
  // ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-300",
    lime: "bg-lime-300",
    yellow: "bg-yellow-300",
    red: "bg-red-300",
    green: "bg-green-300",
    purple: "bg-purple-300",
    pink: "bg-pink-300",
    orange: "bg-orange-300",
    white: "bg-white",
  };

  return (
    <motion.div
      className={`sm:relative h-screen flex flex-col border-r border-zinc-800 bg-zinc-950 fixed top-0 z-50 ${
        isExpanded ? "-left-0" : "-left-16 sm:-left-0"
      }`}
      animate={{
        width: isExpanded ? 313.45 : 62,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Toggle Button */}
      <motion.div
        whileHover={{
          height: "50%",
          transform: "translateY(-10%)",
          opacity: 0.7,
        }}
        className="absolute -right-2 top-1/4 z-50 flex h-2/5 w-[3px] items-center transition-colors justify-center rounded-full bg-zinc-700 hover:bg-zinc-300 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="w-5 h-full  absolute"></span>
      </motion.div>
      {/* Logo Section */}
      <div
        className={`flex items-center gap-3 mb-4 border-b border-zinc-800 ${
          isExpanded ? "p-6" : "px-3 py-6"
        }`}
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <motion.h1
          className="font-semibold text-lg text-zinc-50 whitespace-nowrap origin-left"
          animate={{
            scale: isExpanded ? 1 : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          Synapse AI
        </motion.h1>
      </div>
      {/* New Chat Button */}
      <div className={`${isExpanded ? "p-4" : "px-2 py-4"}`}>
        <motion.div
          animate={{
            width: isExpanded ? "280px" : "40px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="overflow-hidden"
        >
          <Button
            className="w-full justify-center"
            size={isExpanded ? "lg" : "icon"}
            onClick={handleNewChat}
          >
            <Plus className={`h-4 w-4 ${isExpanded ? "" : "ml-4"}`} />

            <motion.span
              className="ml-2 overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{
                scale: isExpanded ? 1 : 0.9,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              New Chat
            </motion.span>
          </Button>
        </motion.div>
      </div>
      {/* Search Bar with AnimatePresence */}
      <div className={`${isExpanded ? "px-4 pb-4" : "px-2 pb-4"}`}>
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-search"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-300"
              />
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-search"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Button variant="secondary" className="w-10 h-10">
                <Search className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Categories and Recent Chats */}
      <ScrollArea className={`flex-1 ${isExpanded ? "px-4" : "px-2"}`}>
        <LayoutGroup>
          {/* Categories Section */}
          <motion.div layout className="space-y-2">
            <motion.div
              layout
              className="flex items-center justify-between text-sm text-white"
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
                marginBottom: isExpanded ? "0.5rem" : 0,
              }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.2 },
              }}
            >
              <span>Categories</span>
            </motion.div>

            {/* Categories List */}
            <motion.div layout className="space-y-1">
              {categories.map((category) => (
                <motion.div
                  layout
                  key={category.name}
                  initial={false}
                  transition={{
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-between py-6 text-zinc-300 hover:bg-zinc-800 transition-colors`}
                    style={{
                      borderWidth: isExpanded ? "1px" : "0px",
                      borderColor: isExpanded ? "#27272a" : "transparent",
                      transition:
                        "border-width 0.3s ease, border-color 0.3s ease",
                    }}
                  >
                    <motion.div layout className="flex items-center relative">
                      <motion.div
                        layout
                        className={`h-[46px] w-[2px] mr-2 shrink-0 ${
                          colorMap[category.color]
                        } absolute -left-[15px]`}
                        animate={{
                          opacity: isExpanded ? 1 : 0.5,
                        }}
                      />
                      <motion.div layout className="flex items-center">
                        <Folder className="!h-5 !w-5" />
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.span
                              layout
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className="ml-2 truncate"
                              transition={{ duration: 0.2 }}
                            >
                              {category.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-xs text-zinc-500"
                        >
                          {category.count}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Recent Chats Section */}
          <motion.div layout className="space-y-2 mt-6">
            <motion.div
              layout
              className="flex items-center justify-between text-sm text-white"
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
                marginBottom: isExpanded ? "0.5rem" : 0,
              }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.2 },
              }}
            >
              <span>Recent Chats</span>
            </motion.div>

            {/* Chats List */}
            <motion.div layout className="space-y-1">
              {chats.map((chat) => (
                <motion.div
                  layout
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  initial={false}
                  transition={{
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-zinc-300 hover:bg-zinc-800 font-normal group ${
                      isExpanded ? "" : "!rounded-none"
                    } ${activeChat ? "" : ""}`}
                  >
                    <motion.div
                      layout
                      className="flex items-center justify-between w-full"
                    >
                      <motion.div
                        layout
                        className="flex items-center overflow-hidden relative"
                      >
                        <MessageSquare className="!h-5 !w-5 shrink-0" />
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              layout
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "200px" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="relative ml-2 h-6 overflow-hidden"
                              transition={{ duration: 0.2 }}
                            >
                              <span className="absolute top-0 left-0 truncate">
                                {chat.title}
                              </span>
                              <div className="absolute inset-0 left-20">
                                <div className="absolute inset-0 bg-gradient-to-l from-zinc-950 via-zinc-950/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-l from-zinc-800 via-zinc-800/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <Ellipsis className="!h-5 !w-5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </LayoutGroup>
      </ScrollArea>
      {/* User Profile */}
      <div
        className={` border-t border-zinc-800 ${isExpanded ? "p-4" : "p-2"}`}
      >
        <div
          className={`flex items-center ${
            isExpanded ? "justify-between" : "justify-center"
          }`}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "280px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                layout
                className="flex items-center overflow-hidden"
              >
                {loading || !profile ? (
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-16" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-8 w-8 rounded-full bg-[#f1f1f1] mr-3 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-black">
                        {getInitials(profile.fullName)}
                      </span>
                    </div>
                    <motion.div
                      className="flex flex-col min-w-[120px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="text-sm font-medium text-zinc-100">
                        {profile.fullName}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {profile.planType === "premium"
                          ? "Premium Plan"
                          : "Free Plan"}
                      </span>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <AccountSettingsDialog />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
