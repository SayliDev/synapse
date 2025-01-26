import { db } from "@/lib/firebase";
import { ProfileFormData } from "@/types/settingsType";
import { updateProfile, User } from "@firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserProfile = async (
  currentUser: User,
  data: ProfileFormData
) => {
  await updateProfile(currentUser, { displayName: data.name });

  const userDocRef = doc(db, "users", currentUser.uid);
  // ! await updateEmail(currentUser, data.email);
  await updateDoc(userDocRef, {
    fullName: data.name,
    email: data.email,
    settings: { language: data.language },
  });
};
