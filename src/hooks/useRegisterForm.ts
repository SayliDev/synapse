import { SignUpData } from "@/types/authType";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const [formError, setFormError] = useState("");

  const form = useForm({
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

  const onSubmit = (data: SignUpData) => {
    setFormError("");
    if (validateForm(data)) {
      console.log("Formulaire envoyé:", data);
    }
  };

  return {
    form,
    formError,
    onSubmit,
  };
};
