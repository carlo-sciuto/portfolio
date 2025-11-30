import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "./ui/sheet";

export function Navbar() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-14 items-center">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="hidden">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-4">
                <a className="font-bold text-lg" href="/">
                  Carlo Sciuto
                </a>
                <nav className="flex flex-col space-y-3">
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection("hero")}
                      className="text-left transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {t("nav.home")}
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-left transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {t("nav.about")}
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection("experience")}
                      className="text-left transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {t("nav.experience")}
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection("skills")}
                      className="text-left transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {t("nav.skills")}
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-left transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      {t("nav.contact")}
                    </button>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mr-4 md:hidden">
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold">Carlo Sciuto</span>
          </a>
        </div>
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Carlo Sciuto
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => scrollToSection("hero")}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.experience")}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.skills")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.contact")}
            </button>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other items here if needed */}
          </div>
          <nav className="flex items-center">
            <LanguageToggle />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
