import { TabType } from "@/types/settingsType";
import { Bell, CreditCard, Shield, User } from "lucide-react";

export const useSettingsTabs = (): TabType[] => {
  return [
    { value: "profile", icon: User, label: "Profil" },
    { value: "billing", icon: CreditCard, label: "Abonnement" },
    { value: "notifications", icon: Bell, label: "Notifications" },
    { value: "security", icon: Shield, label: "Sécurité" },
  ];
};
