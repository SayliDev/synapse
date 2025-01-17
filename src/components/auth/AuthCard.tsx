import logo from "@/assets/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthCard = ({ title, description, children }: AuthCardProps) => (
  <div className="relative w-full max-w-md mx-4">
    <div
      className="absolute -inset-0 sm:-inset-4 rounded-xl blur-3xl opacity-50"
      style={{
        background:
          "linear-gradient(45deg, rgb(168, 85, 247, 0.4), rgb(59, 130, 246, 0.4), rgb(236, 72, 153, 0.4))",
      }}
    />
    <Card className="relative bg-zinc-950/80 backdrop-blur-md border-zinc-800 mx-3 sm:mx-0">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full blur-md bg-zinc-700/50" />
            <img src={logo} alt="Synapse AI Logo" className="relative h-12" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-zinc-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  </div>
);

export default AuthCard;
