import { BackgroundEffects } from "@/components/BackgroundEffects";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-zinc-900 relative overflow-hidden">
    <BackgroundEffects />
    <Sidebar />
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#141418] gap-16 relative">
      {children}
    </div>
  </div>
);

export default MainLayout;
