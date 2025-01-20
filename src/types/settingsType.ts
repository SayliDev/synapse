import { LucideIcon } from "lucide-react";

export type TabType = {
  value: string;
  icon: LucideIcon;
  label: string;
};

export type ProfileFormData = {
  name: string;
  email: string;
  language: string;
};
