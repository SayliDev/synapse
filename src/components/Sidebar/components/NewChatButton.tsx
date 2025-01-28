import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface NewChatButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export const NewChatButton: React.FC<NewChatButtonProps> = ({
  isExpanded,
  onClick,
}) => (
  <div className={`${isExpanded ? "p-4" : "px-2 py-4"}`}>
    <motion.div
      animate={{ width: isExpanded ? "280px" : "40px" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="overflow-hidden"
    >
      <Button
        className="w-full justify-center"
        size={isExpanded ? "lg" : "icon"}
        onClick={onClick}
      >
        <Plus className={`h-4 w-4 ${isExpanded ? "" : "ml-4"}`} />
        <motion.span
          className="ml-2 overflow-hidden whitespace-nowrap"
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
);
