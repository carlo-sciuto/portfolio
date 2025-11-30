import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-8 py-12 relative"
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
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur transition duration-1000 group-hover:opacity-100 animate-pulse" />
          <Avatar className="h-48 w-48 border-4 border-background relative">
            <AvatarImage
              src="https://github.com/carlo-sciuto.png"
              alt="Carlo Sciuto"
            />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      <motion.div
        className="space-y-4 max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          {t("hero.role")}
        </p>
        <p className="text-muted-foreground leading-relaxed">{t("hero.bio")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
