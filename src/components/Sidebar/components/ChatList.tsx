import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ChatItem } from "./ChatItem";

interface ChatListProps {
  chats: any[];
  activeChat: string | null;
  isExpanded: boolean;
  onChatSelect: (chatId: string) => void;
  onRename: (chatId: string) => void;
  onDelete: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChat,
  isExpanded,
  onChatSelect,
  onRename,
  onDelete,
}) => {
  const searchQuery = useSelector((state: RootState) => state.chat.searchQuery);

  // Filtre les chats selon la recherche
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div layout className="space-y-2 mt-6">
      {/* Chat list header */}
      {filteredChats.length !== 0 && (
        <motion.div
          layout
          className="flex items-center justify-between text-sm text-white"
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
            marginBottom: isExpanded ? "0.5rem" : 0,
          }}
        >
          <span>Recent Chats</span>
        </motion.div>
      )}

      {/* Chats */}
      <motion.div layout className="space-y-1">
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={activeChat === chat.id}
            isExpanded={isExpanded}
            onSelect={() => onChatSelect(chat.id)}
            onRename={() => onRename(chat.id)}
            onDelete={() => onDelete(chat.id)}
          />
        ))}
        {filteredChats.length === 0 && (
          <motion.div
            layout
            className={`flex items-center justify-center text-sm text-zinc-500 ${
              isExpanded ? "" : "hidden"
            }`}
          >
            Aucun chat
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
