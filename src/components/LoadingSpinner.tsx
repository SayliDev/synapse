import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner = ({
  size = "md",
  text = "Chargement...",
}: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`animate-spin ${sizeMap[size]}`} />
      {text && <p className="text-sm text-zinc-300">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
