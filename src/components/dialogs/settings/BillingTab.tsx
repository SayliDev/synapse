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

export const BillingTab = ({ planType }: { planType?: "free" | "premium" }) => {
  const isPremium = planType === "premium";

  return (
    <Card className="bg-zinc-900 border-zinc-700">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          {isPremium ? "Plan Premium" : "Plan Gratuit"}
        </CardTitle>
        <CardDescription>
          {isPremium
            ? "Vous êtes actuellement sur le plan Premium"
            : "Vous utilisez actuellement le plan gratuit"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="font-medium">
              {isPremium ? "Premium mensuel" : "Plan gratuit"}
            </p>
            <p className="text-sm text-zinc-400">
              {isPremium ? "Facturé mensuellement" : "Fonctionnalités limitées"}
            </p>
          </div>
          <p className="text-xl md:text-2xl font-bold">
            {isPremium ? "19,99 €" : "Gratuit"}
          </p>
        </div>

        <Button className="w-full" variant={isPremium ? "outline" : "default"}>
          {isPremium ? "Gérer l'abonnement" : "Passer Premium"}
        </Button>

        <Separator className="bg-zinc-800" />

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-zinc-100">
            Fonctionnalités {isPremium ? "incluses" : "du plan"}
          </h4>
          <ul className="space-y-3 text-sm text-zinc-400">
            {isPremium ? (
              <>
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
              </>
            ) : (
              <>
                <li className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2 text-zinc-500" />
                  Conversations limitées
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-zinc-500" />
                  Support standard
                </li>
                <li className="flex items-center">
                  <Key className="h-4 w-4 mr-2 text-zinc-500" />
                  Fonctionnalités de base
                </li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
