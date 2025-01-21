import { SignInData } from "@/types/authType";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useLoginForm = () => {
  const [formError, setFormError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const validateForm = (data: SignInData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setFormError("L'adresse email n'est pas valide");
      return false;
    }

    if (data.password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    return true;
  };

  const onSubmit = async (data: SignInData) => {
    setFormError("");
    setIsLoading(true);
    if (validateForm(data)) {
      try {
        await login(data.email, data.password);

        // Si rememberMe est activé, on peut sauvegarder l'email dans le localStorage
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Redirection vers la page principale après connexion réussie
        navigate("/");
        console.log("Connexion à la page principale");
      } catch (error) {
        // Gestion des erreurs Firebase
        if (error instanceof Error) {
          const errorMessage = error.message;
          switch (errorMessage) {
            case "Firebase: Error (auth/invalid-email).":
              setFormError("Email invalide");
              break;
            case "Firebase: Error (auth/user-not-found).":
              setFormError("Aucun compte associé à cet email");
              break;
            case "Firebase: Error (auth/wrong-password).":
              setFormError("Mot de passe incorrect");
              break;
            case "Firebase: Error (auth/too-many-requests).":
              setFormError("Trop de tentatives. Réessayez plus tard");
              break;
            default:
              setFormError("Une erreur est survenue lors de la connexion");
              console.error("Erreur de connexion:", errorMessage);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Initialiser l'email si rememberMe était activé précédemment
  useState(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      form.setValue("email", rememberedEmail);
      setRememberMe(true);
    }
  });

  return {
    form,
    formError,
    rememberMe,
    isLoading,
    setRememberMe,
    onSubmit,
  };
};
