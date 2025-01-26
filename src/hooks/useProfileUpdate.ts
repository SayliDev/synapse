import { auth } from "@/lib/firebase";
import { updateUserProfile } from "@/services/profileService";
import { ProfileFormData } from "@/types/settingsType";
import { useToast } from "./useToast";

export const useProfileUpdate = () => {
  const { toast } = useToast();

  const handleProfileUpdate = async (data: ProfileFormData) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        await updateUserProfile(currentUser, data);

        const closeButton = document.querySelector(
          "#dialog-close"
        ) as HTMLButtonElement;

        closeButton?.click();

        toast({
          title: "Profil mis à jour",
          description: "Vos informations ont été enregistrées.",
        });
      }
    } catch (error) {
      console.error("Erreur de mise à jour du profil", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "La mise à jour du profil a échoué.",
      });
    }
  };

  return { handleProfileUpdate };
};
