import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Download, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SecurityTab = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-100">
              Authentification à deux facteurs
            </h3>
            <p className="text-sm text-zinc-400">
              Ajouter une couche de sécurité supplémentaire à votre compte
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-zinc-700">
            <Key className="h-4 w-4 mr-2" />
            Activer
          </Button>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-100">
              Exporter les données
            </h3>
            <p className="text-sm text-zinc-400">
              Téléchargez toutes vos données de conversation
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-zinc-700">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>

        <Separator className="bg-zinc-800" />

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-zinc-100">Déconnexion</h3>
            <p className="text-sm text-zinc-400">
              Se déconnecter de votre compte actuel
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="border-red-600 bg-red-600 text-white hover:bg-red-500"
            onClick={() => {
              handleLogout();
            }}
          >
            Déconnexion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
