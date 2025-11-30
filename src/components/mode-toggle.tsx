import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-context";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const performChange = () => {
      if (theme === "dark") {
        setTheme("light");
      } else if (theme === "light") {
        setTheme("dark");
      } else {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        setTheme(systemTheme === "dark" ? "light" : "dark");
      }
    };

    if (!document.startViewTransition) {
      performChange();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      performChange();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t("toggle_theme")}</span>
    </Button>
  );
}
