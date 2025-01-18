import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  CreditCard,
  Download,
  Key,
  Mail,
  Settings,
  Share2,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const AccountSettingsDialog = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const form = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      language: "fr",
    },
  });

  // Animation variants
  const tabContentVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 p-3 hover:text-zinc-100"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Paramètres du compte
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-red-400 to-violet-600 text-zinc-900"
            >
              Premium
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 gap-4 bg-zinc-900 p-1">
            {[
              { value: "profile", icon: User, label: "Profil" },
              { value: "billing", icon: CreditCard, label: "Abonnement" },
              { value: "notifications", icon: Bell, label: "Notifications" },
              { value: "security", icon: Shield, label: "Sécurité" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                value={value}
                className="data-[state=active]:bg-zinc-800"
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="sync">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial="enter"
                animate="center"
                exit="exit"
                layout
                variants={tabContentVariants}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="profile" className="mt-6 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="bg-zinc-900 border-zinc-700"
                      >
                        Changer l'avatar
                      </Button>
                      <p className="text-xs text-zinc-400">
                        JPG, GIF ou PNG. 1MB max.
                      </p>
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
                              <Input
                                {...field}
                                className="bg-zinc-900 border-zinc-700"
                              />
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
                              <Input
                                {...field}
                                className="bg-zinc-900 border-zinc-700"
                              />
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
                </TabsContent>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                initial="enter"
                animate="center"
                exit="exit"
                layout
                variants={tabContentVariants}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="billing" className="mt-6">
                  <Card className="bg-zinc-900 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-xl">Plan Premium</CardTitle>
                      <CardDescription>
                        Vous êtes actuellement sur le plan Premium
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium mensuel</p>
                          <p className="text-sm text-zinc-400">
                            Facturé mensuellement
                          </p>
                        </div>
                        <p className="text-2xl font-bold">19,99 €</p>
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
                </TabsContent>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial="enter"
                animate="center"
                exit="exit"
                layout
                variants={tabContentVariants}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="notifications" className="mt-6">
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
                </TabsContent>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial="enter"
                animate="center"
                exit="exit"
                layout
                variants={tabContentVariants}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="security" className="mt-6">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardContent className="space-y-6 pt-6">
                      {/* Two-Factor Authentication */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-zinc-100">
                            Authentification à deux facteurs
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Ajouter une couche de sécurité supplémentaire à
                            votre compte
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Activer
                        </Button>
                      </div>

                      <Separator className="bg-zinc-800" />

                      {/* Data Export */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-zinc-100">
                            Exporter les données
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Téléchargez toutes vos données de conversation
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Exporter
                        </Button>
                      </div>

                      <Separator className="bg-zinc-800" />

                      {/* Logout */}
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-zinc-100">
                            Déconnexion
                          </h3>
                          <p className="text-sm text-zinc-400">
                            Se déconnecter de votre compte actuel
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="border-red-600 bg-red-600 text-white hover:bg-red-500"
                          onClick={() => {
                            console.log("Déconnecté !");
                          }}
                        >
                          Déconnexion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>

        <DialogFooter>
          <Button type="submit">Enregistrer les modifications</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettingsDialog;
