import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProfileFormData } from "@/types/settingsType";
import { getInitials } from "@/utils/utils";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

type ProfileTabProps = {
  form: UseFormReturn<ProfileFormData>;
};

const ProfileTab = ({ form }: ProfileTabProps) => {
  const { profile, loading } = useUserProfile();

  useEffect(() => {
    if (profile) {
      form.setValue("name", profile.fullName);
      form.setValue("email", profile.email);
      form.setValue("language", profile.settings?.language || "fr");
    }
  }, [profile, form]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 text-center sm:text-left">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-[#f1f1f1] mr-3 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-medium text-black">
            {profile ? getInitials(profile.fullName) : "??"}
          </span>
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <Button
            disabled
            variant="outline"
            className="bg-zinc-900 border-zinc-700"
          >
            Changer l'avatar
          </Button>
          <p className="text-xs text-zinc-400">JPG, GIF ou PNG. 1MB max.</p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-zinc-900 border-zinc-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-zinc-900 border-zinc-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Langue</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900 border-zinc-700">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProfileTab;
