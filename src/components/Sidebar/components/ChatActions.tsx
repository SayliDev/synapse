import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatActionsProps } from "@/types/sidebarType";
import { AnimatePresence, motion } from "framer-motion";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

export const ChatActions = ({
  chatId,
  onRename,
  onDelete,
  isExpanded,
}: ChatActionsProps) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Ellipsis className="!h-5 !w-5" />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onRename(chatId);
              }}
              className="flex items-center gap-2 text-zinc-300 focus:text-white focus:bg-zinc-800"
            >
              <Pencil className="h-4 w-4" />
              Renommer
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chatId);
              }}
              className="flex items-center gap-2 text-red-400 focus:text-red-300 focus:bg-zinc-800"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </AnimatePresence>
  );
};
