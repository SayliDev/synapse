import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { LoadingButtonProps } from "@/types/buttonType";
import { AnimatePresence, motion } from "framer-motion";

const LoadingButton = ({
  isLoading,
  loadingText = "Chargement...",
  children,
  className = "",
  variant = "default",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      variant={variant}
      className={`relative overflow-hidden ${className}`}
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            <LoadingSpinner size="sm" text="" />
            <span>{loadingText}</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default LoadingButton;
