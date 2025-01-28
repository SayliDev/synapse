import { Category } from "@/types/sidebarType";
import { motion } from "framer-motion";
import { CategoryItem } from "./CategoryItem";

interface CategoryListProps {
  categories: Category[];
  isExpanded: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isExpanded,
}) => (
  <motion.div layout className="space-y-2">
    {/* Categories header */}
    <motion.div
      layout
      className="flex items-center justify-between text-sm text-white"
      animate={{
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0,
        marginBottom: isExpanded ? "0.5rem" : 0,
      }}
    >
      <span>Categories</span>
    </motion.div>

    {/* Categories list */}
    <motion.div layout className="space-y-1">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          category={category}
          isExpanded={isExpanded}
        />
      ))}
    </motion.div>
  </motion.div>
);
