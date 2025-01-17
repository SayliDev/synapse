// src/hooks/useLoginForm.ts
import { SignInData } from "@/types/authType";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const [formError, setFormError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm({
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

  const onSubmit = (data: SignInData) => {
    setFormError("");
    if (validateForm(data)) {
      console.log("Formulaire envoyé:", data);
      console.log("Remember me:", rememberMe);
    }
  };

  return {
    form,
    formError,
    rememberMe,
    setRememberMe,
    onSubmit,
  };
};
