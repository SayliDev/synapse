import { db } from "@/lib/firebase";
import { UserProfile } from "@/types/userType";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          setError("Profil utilisateur non trouvé");
        }
      } catch (err) {
        setError("Erreur lors de la récupération du profil");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return { profile, loading, error };
};
