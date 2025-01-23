import { AuthCard } from "@/components/auth/AuthCard";
import { FormInput } from "@/components/auth/FormInput";
import { SocialLogin } from "@/components/auth/SocialLogin";
import LoadingButton from "@/components/LoadingButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoginForm } from "@/hooks/useLoginForm";
import PageLayout from "@/layouts/PageLayout";
import { GalleryVerticalEnd, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { form, formError, isLoading, rememberMe, setRememberMe, onSubmit } =
    useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

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

        <AuthCard
          title="Bienvenue"
          description="Connectez-vous pour accéder à Synapse AI"
        >
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

          <SocialLogin />

          <div className="relative">
            <Separator className="bg-zinc-800" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-2 text-sm text-zinc-500">
              ou
            </span>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        icon={Mail}
                        type="email"
                        placeholder="exemple@email.com"
                        field={field}
                      />
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
                      <FormInput
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        field={field}
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="border-gray-700 data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300">
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

              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Connexion en cours..."
                className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
              >
                Se connecter
              </LoadingButton>
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
        </AuthCard>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
