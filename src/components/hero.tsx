import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-8 py-12"
    >
      <Avatar className="h-48 w-48 border-4 border-primary/10">
        <AvatarImage
          src="https://github.com/carlo-sciuto.png"
          alt="Carlo Sciuto"
        />
        <AvatarFallback>MM</AvatarFallback>
      </Avatar>

      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          {t("hero.role")}
        </p>
        <p className="text-muted-foreground leading-relaxed">{t("hero.bio")}</p>
      </div>
    </section>
  );
}
