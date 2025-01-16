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
import { SignInData } from "@/types/authType";
import { Eye, EyeOff, GalleryVerticalEnd, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const validateForm = (data: SignInData) => {
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
    return true;
  };

  const onSubmit = (data: SignInData) => {
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
        {/* Wrapper pour la card et ses effets de lueur */}
        <div className="relative w-full max-w-md mx-4">
          {/* Effet de lueur avec dégradé */}
          <div
            className="absolute -inset-4 rounded-xl blur-3xl opacity-50"
            style={{
              background:
                "linear-gradient(45deg, rgb(168, 85, 247, 0.4), rgb(59, 130, 246, 0.4), rgb(236, 72, 153, 0.4))",
            }}
          />

          <Card className="relative bg-zinc-950/80 backdrop-blur-md border-zinc-800">
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
                Bienvenue
              </CardTitle>
              <CardDescription className="text-center text-zinc-400">
                Connectez-vous pour accéder à Synapse AI
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {formError && (
                <Alert
                  variant="destructive"
                  className="bg-red-900/50 border-red-900 !text-zinc-300"
                >
                  <AlertDescription className="text-center">
                    {formError}
                  </AlertDescription>
                </Alert>
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
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-gray-700 data-[state=checked]:bg-blue-600"
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-300"
                      >
                        Se souvenir de moi
                      </Label>
                    </div>
                    <Button
                      variant="link"
                      className="text-sm p-0 text-zinc-400 hover:text-white"
                    >
                      Mot de passe oublié ?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
                  >
                    Se connecter
                  </Button>
                </form>
              </Form>

              <div className="text-center text-sm text-zinc-500">
                Pas encore de compte ?{" "}
                <Button
                  variant="link"
                  className="p-0 text-zinc-400 hover:text-white"
                  onClick={() => navigate("/register")}
                >
                  S'inscrire
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
