import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", {
    returnObjects: true,
  }) as ExperienceItem[];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section id="experience" className="py-12">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t("experience.title")}
      </motion.h2>
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Array.isArray(items) &&
          items.map((experience, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-xl">{experience.role}</CardTitle>
                    <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                      {experience.period}
                    </span>
                  </div>
                  <CardDescription className="text-lg font-semibold text-primary">
                    {experience.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {experience.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
