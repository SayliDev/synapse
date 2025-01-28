import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatActions } from "./ChatActions";

interface ChatItemProps {
  chat: {
    id: string;
    title: string;
  };
  isActive: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isActive,
  isExpanded,
  onSelect,
  onRename,
  onDelete,
}) => (
  <motion.div
    layout
    onClick={onSelect}
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
      } ${isActive ? " bg-zinc-800" : ""}`}
    >
      <motion.div layout className="flex items-center justify-between w-full">
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-l from-zinc-800 via-zinc-800/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100 ${
                      isActive ? "opacity-100" : ""
                    }`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <ChatActions
              chatId={chat.id}
              onRename={onRename}
              onDelete={onDelete}
              isExpanded={isExpanded}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Button>
  </motion.div>
);
