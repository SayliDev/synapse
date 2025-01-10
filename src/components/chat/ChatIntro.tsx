import CardsSection from "../sections/CardsSection";
import HeroSection from "../sections/HeroSection";
import TabsSection from "../TabsSection";
import logo from "@/assets/logo.svg";

const ChatIntro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#141418] gap-16 relative">
      <TabsSection />
      <img src={logo} alt="Synapse AI Logo" className="h-24" loading="lazy" />
      <HeroSection />
      <CardsSection />
    </div>
  );
};

export default ChatIntro;
