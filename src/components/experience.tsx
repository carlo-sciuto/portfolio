import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

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

  return (
    <section id="experience" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {t("experience.title")}
      </h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {Array.isArray(items) &&
          items.map((item, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <CardTitle className="text-xl">{item.role}</CardTitle>
                  <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>
                <CardDescription className="text-lg font-semibold text-primary">
                  {item.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
