import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-12">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t("skills.title")}
      </motion.h2>
      <motion.div
        className="space-y-12 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {Array.isArray(categories) &&
          categories.map((category, index) => (
            <motion.div key={index} className="space-y-4" variants={item}>
              <h3 className="text-2xl font-semibold border-b pb-2">
                {category.name}
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">
                        {t("skills.headers.technology")}
                      </TableHead>
                      <TableHead className="w-[40%]">
                        {t("skills.headers.proficiency")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("skills.headers.experience")}
                      </TableHead>
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
                            <div className="h-2 w-[60%] overflow-hidden rounded-full bg-primary/20">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.rating}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                              />
                            </div>
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
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
