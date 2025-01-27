import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "./settingsType";

export interface UserProfile {
  fullName: string;
  email: string;
  planType?: "free" | "premium";
  settings?: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}

export interface ProfileTabProps {
  form: UseFormReturn<ProfileFormData>;
  profile: UserProfile | null;
  loading: boolean;
}
