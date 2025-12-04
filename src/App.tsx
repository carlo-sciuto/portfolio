import { ThemeProvider } from "@/components/theme-provider";
import { SEOProvider, SEO } from "@/components/seo";
import { ErrorBoundary } from "@/components/error-boundary";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";
import { config } from "@/lib/config";

function App() {
  return (
    <SEOProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SEO />
        <ErrorBoundary>
          <div className="min-h-screen font-sans antialiased relative">
            <Background />
            <Navbar />
            <main className="container py-6 mx-auto px-4 relative z-10">
              <Hero />
              <About />
              <Experience />
              <Skills />
              {config.features.projects && <Projects />}
              {config.features.certifications && <Certifications />}
              <Contact />
            </main>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </SEOProvider>
  );
}

export default App;
