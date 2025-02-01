import { motion } from "framer-motion";

interface ToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => (
  <motion.div
    whileHover={{
      height: "50%",
      transform: "translateY(-10%)",
      opacity: 0.7,
    }}
    className="absolute -right-2 top-1/4 z-50 flex h-2/5 w-[3px] items-center transition-colors justify-center rounded-full bg-zinc-700 hover:bg-zinc-300 cursor-pointer"
    onClick={onToggle}
  >
    <span className="w-5 h-full absolute"></span>
  </motion.div>
);
