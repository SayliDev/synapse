import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  isExpanded: boolean;
  onExpand: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isExpanded,
  onExpand,
}) => (
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
          onClick={onExpand}
        >
          <Button variant="secondary" className="w-10 h-10">
            <Search className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
