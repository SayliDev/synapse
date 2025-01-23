import AuthCard from "@/components/auth/AuthCard";
import FormInput from "@/components/auth/FormInput";
import SocialLogin from "@/components/auth/SocialLogin";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import PageLayout from "@/layouts/PageLayout";
import {
  Eye,
  EyeOff,
  GalleryVerticalEnd,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { form, formError, isLoading, onSubmit } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          title="Créez votre compte"
          description="Rejoignez Synapse AI et commencez votre voyage"
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormInput
                        icon={User}
                        type="text"
                        placeholder="Nom complet"
                        field={field}
                      />
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

              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Inscription en cours..."
                className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
              >
                Créer un compte
              </LoadingButton>
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
        </AuthCard>

        <p className="text-center text-xs text-zinc-500 max-w-md">
          En vous inscrivant, vous acceptez de recevoir des emails marketing de
          Synapse AI. Vous pourrez vous désinscrire à tout moment.
        </p>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
