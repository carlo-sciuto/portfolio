import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-8 py-12 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="[perspective:1000px]">
        <motion.div
          className="relative group"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute -inset-4 rounded-full border border-primary/20"
            style={{ transform: "translateZ(-50px)" }}
          />
          <div
            className="absolute -inset-8 rounded-full border border-primary/10"
            style={{ transform: "translateZ(-80px)" }}
          />
          <div style={{ transform: "translateZ(50px)" }}>
            <Avatar className="h-48 w-48 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
              <AvatarImage
                src="https://github.com/carlo-sciuto.png"
                alt="Carlo Sciuto"
                className="object-cover"
              />
              <AvatarFallback className="text-4xl bg-background">
                CS
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </div>

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
        transition={{
          delay: 1,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
