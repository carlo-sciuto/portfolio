import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen font-sans antialiased relative">
        <Background />
        <Navbar />
        <main className="container py-6 mx-auto px-4 relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
