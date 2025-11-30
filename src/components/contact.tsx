import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8">{t("contact.title")}</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" className="gap-2 h-12 px-6" asChild>
              <a href="mailto:carlo.sciuto95@gmail.com">
                <Mail className="h-5 w-5" />
                {t("contact.email")}
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" className="gap-2 h-12 px-6" asChild>
              <a
                href="https://www.linkedin.com/in/carlo-sciuto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                {t("contact.linkedin")}
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" className="gap-2 h-12 px-6" asChild>
              <a
                href="https://github.com/carlo-sciuto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                {t("contact.github")}
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
