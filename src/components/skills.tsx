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
import { getSkillIcon } from "@/utils/skill-icons";

interface SkillItem {
  name: string;
  rating: number;
  experience: string;
  icon?: string;
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
              <div className="rounded-md border hover:shadow-md transition-shadow duration-300 bg-card/50 backdrop-blur-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[35%]">
                        {t("skills.headers.technology")}
                      </TableHead>
                      <TableHead className="w-[40%]">
                        {t("skills.headers.proficiency")}
                      </TableHead>
                      <TableHead className="w-[25%] text-right whitespace-nowrap">
                        {t("skills.headers.experience")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.items.map((item, i) => {
                      const { icon: Icon, color } = getSkillIcon(
                        item.icon || item.name
                      );
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium p-2 sm:p-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Icon
                                className="h-4 w-4 flex-shrink-0"
                                style={{ color: color }}
                              />
                              <span className="text-xs sm:text-sm">
                                {item.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-primary/20">
                                <motion.div
                                  className="h-full bg-primary"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${item.rating}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  viewport={{ once: true }}
                                />
                              </div>
                              <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 w-8 sm:w-auto">
                                {item.rating}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right p-2 sm:p-4">
                            <Badge
                              variant="secondary"
                              className="whitespace-nowrap text-[10px] sm:text-xs px-1.5 sm:px-2.5"
                            >
                              {item.experience}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
