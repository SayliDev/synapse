import { motion } from "framer-motion";

interface LogoSectionProps {
  isExpanded: boolean;
  logo: string;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  isExpanded,
  logo,
}) => (
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
      transition={{ duration: 0.2 }}
    >
      Synapse AI
    </motion.h1>
  </div>
);
