import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ProfileFormData } from "@/types/settingsType";
import { UseFormReturn } from "react-hook-form";

type ProfileTabProps = {
  form: UseFormReturn<ProfileFormData>;
};

const ProfileTab = ({ form }: ProfileTabProps) => (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <Avatar className="h-16 w-16 md:h-20 md:w-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-2 text-center sm:text-left">
        <Button variant="outline" className="bg-zinc-900 border-zinc-700">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

export default ProfileTab;
