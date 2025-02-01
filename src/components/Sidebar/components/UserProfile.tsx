import AccountSettingsDialog from "@/components/dialogs/AccountSettingsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileType } from "@/types/userType";
import { getInitials } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";

interface UserProfileProps {
  profile: ProfileType | null;
  loading: boolean;
  isExpanded: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  profile,
  loading,
  isExpanded,
}) => (
  <div className={`border-t border-zinc-800 ${isExpanded ? "p-4" : "p-2"}`}>
    <div
      className={`flex items-center ${
        isExpanded ? "justify-between" : "justify-center"
      }`}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "280px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            layout
            className="flex items-center overflow-hidden"
          >
            {loading || !profile ? (
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            ) : (
              <>
                <div className="h-8 w-8 rounded-full bg-[#f1f1f1] mr-3 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-black">
                    {getInitials(profile.fullName)}
                  </span>
                </div>
                <motion.div
                  className="flex flex-col min-w-[120px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-sm font-medium text-zinc-100">
                    {profile.fullName}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {profile.planType === "premium"
                      ? "Premium Plan"
                      : "Free Plan"}
                  </span>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AccountSettingsDialog />
    </div>
  </div>
);
