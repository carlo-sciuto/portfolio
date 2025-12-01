import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown, Smartphone } from "lucide-react";
import { use3DMotion } from "@/hooks/use3DMotion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useTranslation();
  const {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
    isMobile,
    permissionGranted,
    requestOrientationPermission,
  } = use3DMotion();

  const handleEnableGyroscope = async () => {
    await requestOrientationPermission();
  };

  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-8 py-12 relative"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
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

        {isMobile && !permissionGranted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={handleEnableGyroscope}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Enable 3D Gyroscope Effect
            </Button>
          </motion.div>
        )}
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
