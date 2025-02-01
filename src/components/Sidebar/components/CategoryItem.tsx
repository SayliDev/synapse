import { Button } from "@/components/ui/button";
import { Category } from "@/types/sidebarType";
import { COLOR_MAP } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Folder } from "lucide-react";

interface CategoryItemProps {
  category: Category;
  isExpanded: boolean;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isExpanded,
}) => (
  <Button
    variant="ghost"
    className={`w-full justify-between py-6 text-zinc-300 hover:bg-zinc-800 transition-colors`}
    style={{
      borderWidth: isExpanded ? "1px" : "0px",
      borderColor: isExpanded ? "#27272a" : "transparent",
      transition: "border-width 0.3s ease, border-color 0.3s ease",
    }}
  >
    <motion.div layout className="flex items-center relative">
      <motion.div
        layout
        className={`h-[46px] w-[2px] mr-2 shrink-0 ${
          COLOR_MAP[category.color]
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
);
