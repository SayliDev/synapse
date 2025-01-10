import MainLayout from "@/layouts/MainLayout";
import { ThemeProvider } from "./components/theme-provider";
import ChatContainer from "./pages/ChatContainer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        {/* <TabsSection />
        <img src={logo} alt="Synapse AI Logo" className="h-24" loading="lazy" />
        <HeroSection />
        <CardsSection /> */}
        <ChatContainer />
        {/* <div className="fixed bottom-0 w-screen sm:w-9/12 p-4">
          <MessageBar  />
        </div> */}
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
