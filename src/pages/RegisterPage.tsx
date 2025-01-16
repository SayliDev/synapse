import AppleIcon from "@/assets/icons/AppleIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import logo from "@/assets/logo.svg";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/layouts/PageLayout";
import { FormData } from "@/types/authType";
import {
  Eye,
  EyeOff,
  GalleryVerticalEnd,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateForm = (data: FormData) => {
    // Validation du nom
    if (!data.fullName) {
      setFormError("Le nom complet est requis");
      return false;
    }
    if (data.fullName.length < 3) {
      setFormError("Le nom doit contenir au moins 3 caractères");
      return false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setFormError("L'adresse email n'est pas valide");
      return false;
    }

    // Validation du mot de passe
    if (data.password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }

    // Validation de la confirmation du mot de passe
    if (data.password !== data.confirmPassword) {
      setFormError("Les mots de passe ne correspondent pas");
      return false;
    }

    // Validation des conditions d'utilisation
    if (!data.terms) {
      setFormError("Vous devez accepter les conditions d'utilisation");
      return false;
    }

    return true;
  };

  const onSubmit = (data: FormData) => {
    setFormError("");
    if (validateForm(data)) {
      // Simulation d'envoi du formulaire
      console.log("Formulaire envoyé:", data);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-zinc-950">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium text-zinc-50"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-50">
            <GalleryVerticalEnd color="black" className="size-4" />
          </div>
          Synapse Inc.
        </a>

        <div className="relative w-full max-w-md mx-4">
          <div
            className="absolute -inset-0 sm:-inset-4 rounded-xl blur-3xl opacity-50"
            style={{
              background:
                "linear-gradient(45deg, rgb(168, 85, 247, 0.4), rgb(59, 130, 246, 0.4), rgb(236, 72, 153, 0.4))",
            }}
          />

          <Card className="relative bg-zinc-950/80 backdrop-blur-md border-zinc-800 mx-3 sm:mx-0">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full blur-md bg-zinc-700/50" />
                  <img
                    src={logo}
                    alt="Synapse AI Logo"
                    className="relative h-12"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white">
                Créez votre compte
              </CardTitle>
              <CardDescription className="text-center text-zinc-400">
                Rejoignez Synapse AI et commencez votre voyage
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {formError && (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert
                    variant="destructive"
                    className="bg-red-900/50 border-red-900 !text-zinc-300"
                  >
                    <AlertDescription className="text-center">
                      {formError}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800/50"
                >
                  <GoogleIcon color="fff" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800/50"
                >
                  <AppleIcon color="fff" />
                  Apple
                </Button>
              </div>

              <div className="relative">
                <Separator className="bg-zinc-800" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-2 text-sm text-zinc-500">
                  ou
                </span>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors" />
                            <Input
                              {...field}
                              type="text"
                              placeholder="Nom complet"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="exemple@email.com"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-zinc-400 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400 group-focus-within:text-white transition-colors" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirmer le mot de passe"
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-3 text-zinc-400 hover:text-white transition-colors"
                            >
                              {showConfirmPassword ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex space-x-2 items-center">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="terms"
                              className="border-gray-700"
                            />
                            <Label
                              htmlFor="terms"
                              className="text-sm text-gray-300"
                            >
                              J'accepte les{" "}
                              <a
                                href="#"
                                target="_blank"
                                className="hover:underline"
                              >
                                conditions d'utilisation
                              </a>
                            </Label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
                  >
                    Créer un compte
                  </Button>
                </form>
              </Form>

              <div className="text-center text-sm text-zinc-500">
                Vous avez déjà un compte ?{" "}
                <Button
                  variant="link"
                  className="p-0 text-zinc-400 hover:text-white"
                  onClick={() => navigate("/login")}
                >
                  Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xs text-zinc-500 max-w-md">
          En vous inscrivant, vous acceptez de recevoir des emails marketing de
          Synapse AI. Vous pourrez vous désinscrire à tout moment.
        </p>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
