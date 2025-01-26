import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { useSettingsTabs } from "@/hooks/useSettingsTabs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { tabContentVariants } from "@/styles/animations/tabTransitions";
import { ProfileFormData } from "@/types/settingsType";
import { AnimatePresence, motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../LoadingSpinner";
import BillingTab from "./settings/BillingTab";
import NotificationsTab from "./settings/NotificationsTab";
import ProfileTab from "./settings/ProfileTab";
import { SecurityTab } from "./settings/SecurityTab";

export const AccountSettingsDialog = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = useSettingsTabs();
  const { profile, loading } = useUserProfile();
  const { handleProfileUpdate } = useProfileUpdate();

  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: profile?.fullName || "John Doe",
      email: profile?.email || "john@example.com",
      language: profile?.settings?.language || "fr",
    },
  });

  const renderTabContent = () => {
    const tabMap: { [key: string]: JSX.Element } = {
      profile: <ProfileTab form={form} profile={profile} loading={loading} />,
      billing: <BillingTab planType={profile?.planType} />,
      notifications: <NotificationsTab />,
      security: <SecurityTab />,
    };

    return tabMap[activeTab] || null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 p-3 hover:text-zinc-100"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-2">
            Paramètres du compte
            {profile?.planType === "premium" && (
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-red-400 to-violet-600 text-zinc-900"
              >
                Premium
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-zinc-900 p-1 mb-12 sm:mb-0">
            {tabs.map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:bg-zinc-800 flex items-center justify-center gap-2 px-2 py-1.5"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.substring(0, 3)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mt-4 md:mt-6"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <DialogFooter className="mt-4 sm:mt-6">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={form.handleSubmit((data) => handleProfileUpdate(data))}
          >
            <AnimatePresence mode="wait">
              {loading || form.formState.isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <LoadingSpinner size="sm" text="" />
                  <span>Enregistrer les modifications</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  Enregistrer les modifications
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettingsDialog;
