import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-8 py-12"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5,
        }}
      >
        <Avatar className="h-48 w-48 border-4 border-primary/10">
          <AvatarImage
            src="https://github.com/carlo-sciuto.png"
            alt="Carlo Sciuto"
          />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.div
        className="space-y-4 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          {t("hero.role")}
        </p>
        <p className="text-muted-foreground leading-relaxed">{t("hero.bio")}</p>
      </motion.div>
    </section>
  );
}
