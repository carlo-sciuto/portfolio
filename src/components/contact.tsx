import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-8">{t("contact.title")}</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <Button variant="outline" className="gap-2 h-12 px-6" asChild>
          <a href="mailto:your.email@example.com">
            <Mail className="h-5 w-5" />
            {t("contact.email")}
          </a>
        </Button>
        <Button variant="outline" className="gap-2 h-12 px-6" asChild>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            {t("contact.linkedin")}
          </a>
        </Button>
        <Button variant="outline" className="gap-2 h-12 px-6" asChild>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            {t("contact.github")}
          </a>
        </Button>
      </div>
    </section>
  );
}
