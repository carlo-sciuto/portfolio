import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface SkillItem {
  name: string;
  rating: number;
  experience: string;
}

interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export function Skills() {
  const { t } = useTranslation();
  const categories = t("skills.categories", {
    returnObjects: true,
  }) as SkillCategory[];

  return (
    <section id="skills" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {t("skills.title")}
      </h2>
      <div className="space-y-12 max-w-4xl mx-auto">
        {Array.isArray(categories) &&
          categories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-semibold border-b pb-2">
                {category.name}
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">{t('skills.headers.technology')}</TableHead>
                      <TableHead className="w-[40%]">{t('skills.headers.proficiency')}</TableHead>
                      <TableHead className="text-right">{t('skills.headers.experience')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.items.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={item.rating}
                              className="h-2 w-[60%]"
                            />
                            <span className="text-xs text-muted-foreground">
                              {item.rating}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{item.experience}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
