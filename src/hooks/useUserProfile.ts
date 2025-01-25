import { db } from "@/lib/firebase";
import { UserProfile } from "@/types/userType";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    // Utilise onSnapshot pour un suivi en temps réel
    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
          setLoading(false);
        } else {
          setError("Profil utilisateur non trouvé");
          setLoading(false);
        }
      },
      (err) => {
        setError("Erreur lors de la récupération du profil");
        console.error("Erreur:", err);
        setLoading(false);
      }
    );

    // Nettoie l'abonnement lors du démontage
    return () => unsubscribe();
  }, [user]);

  return { profile, loading, error };
};
