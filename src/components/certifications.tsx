import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credlyUrl?: string;
  credlyBadgeId?: string;
  image?: string;
  verificationUrl?: string;
}

export function Certifications() {
  const { t } = useTranslation();
  const certifications = t("certifications.items", {
    returnObjects: true,
  }) as Certification[];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="certifications" className="py-12">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t("certifications.title")}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Array.isArray(certifications) &&
          certifications.map((cert, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  {cert.credlyBadgeId ? (
                    // Credly Embedded Badge
                    <div className="flex justify-center mb-4">
                      <div
                        data-iframe-width="200"
                        data-iframe-height="270"
                        data-share-badge-id={cert.credlyBadgeId}
                        data-share-badge-host="https://www.credly.com"
                      >
                        <script
                          type="text/javascript"
                          async
                          src="//cdn.credly.com/assets/utilities/embed.js"
                        ></script>
                      </div>
                    </div>
                  ) : cert.image ? (
                    // Custom Image
                    <div className="flex justify-center mb-4">
                      <img src={cert.image} alt={cert.title} className="h-32 w-32 object-contain" />
                    </div>
                  ) : null}
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2 text-center">
                    <p className="text-sm font-medium text-primary">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  {(cert.credlyUrl || cert.verificationUrl) && (
                    <div className="mt-4 flex justify-center">
                      <a
                        href={cert.credlyUrl || cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {t("certifications.verify", "Verify")}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
