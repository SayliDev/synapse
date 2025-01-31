import logo from "@/assets/logo.png";
import { useChat } from "@/hooks/useChat";
import { useUserProfile } from "@/hooks/useUserProfile";
import { RootState } from "@/store";
import { createChatThunk, setActiveChat } from "@/store/slices/chatSlice";
import { CATEGORIES } from "@/utils/constants";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "../ui/scroll-area";
import { CategoryList } from "./components/CategoryList";
import { ChatList } from "./components/ChatList";
import { LogoSection } from "./components/LogoSection";
import { NewChatButton } from "./components/NewChatButton";
import { SearchBar } from "./components/SearchBar";
import { ToggleButton } from "./components/ToggleButton";
import { UserProfile } from "./components/UserProfile";

export const Sidebar = () => {
  /* -------------------------------------------------------------------------- */
  /*                                Declarations                                */
  /* -------------------------------------------------------------------------- */
  const { profile, loading } = useUserProfile();
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state: RootState) => state.chat);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  const { handleDeleteChat } = useChat();

  const handleNewChat = () => dispatch(createChatThunk());
  const handleChatSelect = (chatId: string) => dispatch(setActiveChat(chatId));
  const handleRename = (chatId: string) =>
    console.log("Renommer chat:", chatId);
  const handleDelete = (chatId: string) => {
    handleDeleteChat(chatId);
    console.log("Supprimer chat:", chatId);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <motion.div
      className={`sm:relative h-screen flex flex-col border-r border-zinc-800 bg-zinc-950 fixed top-0 z-50 ${
        isExpanded ? "-left-0" : "-left-16 sm:-left-0"
      }`}
      animate={{ width: isExpanded ? 313.45 : 62 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <ToggleButton
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      <LogoSection isExpanded={isExpanded} logo={logo} />
      <NewChatButton isExpanded={isExpanded} onClick={handleNewChat} />
      <SearchBar isExpanded={isExpanded} onExpand={() => setIsExpanded(true)} />

      <ScrollArea className={`flex-1 ${isExpanded ? "px-4" : "px-2"}`}>
        <LayoutGroup>
          <CategoryList categories={CATEGORIES} isExpanded={isExpanded} />
          <ChatList
            chats={chats}
            activeChat={activeChat}
            isExpanded={isExpanded}
            onChatSelect={handleChatSelect}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </LayoutGroup>
      </ScrollArea>

      <UserProfile
        profile={profile}
        loading={loading}
        isExpanded={isExpanded}
      />
    </motion.div>
  );
};

export default Sidebar;
