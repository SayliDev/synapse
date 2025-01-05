import logo from "./assets/logo.png";
import MessageBar from "./components/MessageBar";
import CardsSection from "./components/sections/CardsSection";
import HeroSection from "./components/sections/HeroSection";
import TabsSection from "./components/TabsSection";
import { ThemeProvider } from "./components/theme-provider";
import MainLayout from "@/layouts/MainLayout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        <TabsSection />
        <img src={logo} alt="Synapse AI Logo" className="mb-4" loading="lazy" />
        <HeroSection />
        <CardsSection />
        <div className="fixed bottom-0 w-9/12 p-4">
          <MessageBar />
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
