import AppleIcon from "@/assets/icons/AppleIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Button } from "@/components/ui/button";

export const SocialLogin = () => (
  <div className="grid grid-cols-2 gap-4">
    <Button
      variant="outline"
      className="w-full bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800/50"
    >
      <GoogleIcon color="fff" />
      Google
    </Button>
    <Button
      variant="outline"
      className="w-full bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800/50"
    >
      <AppleIcon color="fff" />
      Apple
    </Button>
  </div>
);

export default SocialLogin;
