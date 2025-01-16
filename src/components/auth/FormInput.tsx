import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface FormInputProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  field: any;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const FormInput = ({
  icon: Icon,
  type,
  placeholder,
  field,
  showPassword,
  onTogglePassword,
}: FormInputProps) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors" />
    <Input
      {...field}
      type={type}
      placeholder={placeholder}
      className="pl-10 pr-10"
    />
    {onTogglePassword && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-3 text-zinc-400 hover:text-white transition-colors"
      >
        {showPassword ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    )}
  </div>
);

export default FormInput;
