import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Key, Mail, Share2 } from "lucide-react";

export const BillingTab = () => (
  <Card className="bg-zinc-900 border-zinc-700">
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">Plan Premium</CardTitle>
      <CardDescription>
        Vous êtes actuellement sur le plan Premium
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="font-medium">Premium mensuel</p>
          <p className="text-sm text-zinc-400">Facturé mensuellement</p>
        </div>
        <p className="text-xl md:text-2xl font-bold">19,99 €</p>
      </div>
      <Button className="w-full" variant="outline">
        Gérer l'abonnement
      </Button>
      <Separator className="bg-zinc-800" />
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-zinc-100">
          Fonctionnalités incluses
        </h4>
        <ul className="space-y-3 text-sm text-zinc-400">
          <li className="flex items-center">
            <Share2 className="h-4 w-4 mr-2 text-zinc-500" />
            Conversations illimitées
          </li>
          <li className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-zinc-500" />
            Support prioritaire
          </li>
          <li className="flex items-center">
            <Key className="h-4 w-4 mr-2 text-zinc-500" />
            Fonctionnalités avancées
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

export default BillingTab;
