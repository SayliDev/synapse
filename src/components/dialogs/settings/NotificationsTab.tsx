import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const NotificationsTab = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Notifications par email</Label>
        <p className="text-sm text-zinc-400">
          Recevoir des emails sur les mises à jour
        </p>
      </div>
      <Switch className="bg-zinc-700" />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Notifications sur le site</Label>
        <p className="text-sm text-zinc-400">
          Afficher les notifications dans l'application
        </p>
      </div>
      <Switch className="bg-zinc-700" />
    </div>
  </div>
);

export default NotificationsTab;
