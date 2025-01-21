import { db } from "@/lib/firebase";
import { SignUpData } from "@/types/authType";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useRegisterForm = () => {
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignUpData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const validateForm = (data: SignUpData) => {
    if (!data.fullName) {
      setFormError("Le nom complet est requis");
      return false;
    }
    if (data.fullName.length < 3) {
      setFormError("Le nom doit contenir au moins 3 caractères");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setFormError("L'adresse email n'est pas valide");
      return false;
    }

    if (data.password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      setFormError(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
      return false;
    }

    if (data.password !== data.confirmPassword) {
      setFormError("Les mots de passe ne correspondent pas");
      return false;
    }

    if (!data.terms) {
      setFormError("Vous devez accepter les conditions d'utilisation");
      return false;
    }

    return true;
  };

  const createUserProfile = async (userId: string, data: SignUpData) => {
    try {
      await setDoc(doc(db, "users", userId), {
        fullName: data.fullName,
        email: data.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        settings: {
          theme: "light",
          notifications: true,
          language: "fr",
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création du profil:", error);
      throw new Error("Erreur lors de la création du profil utilisateur");
    }
  };

  const onSubmit = async (data: SignUpData) => {
    setFormError("");
    setIsLoading(true);

    try {
      if (validateForm(data)) {
        // Création du compte Firebase
        const userCredential = await register(data.email, data.password);

        // Création du profil utilisateur dans Firestore
        await createUserProfile(userCredential.uid, data);

        // Redirection vers la page principale
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setFormError("Cette adresse email est déjà utilisée");
            break;
          case "Firebase: Error (auth/invalid-email).":
            setFormError("Adresse email invalide");
            break;
          case "Firebase: Error (auth/operation-not-allowed).":
            setFormError("La création de compte est temporairement désactivée");
            break;
          case "Firebase: Error (auth/weak-password).":
            setFormError("Le mot de passe est trop faible");
            break;
          default:
            setFormError("Une erreur est survenue lors de l'inscription");
            console.error("Erreur d'inscription:", error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    formError,
    isLoading,
    onSubmit,
  };
};
