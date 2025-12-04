import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export function Projects() {
  const { t } = useTranslation();
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const projects = t("projects.items", { returnObjects: true }) as Project[];
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(selectedTech));

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = filteredProjects.length > visibleCount;

  return (
    <section id="projects" className="py-12">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t("projects.title")}
      </motion.h2>

      {/* Technology Filter */}
      {allTechs.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Badge
            variant={selectedTech === "All" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTech("All")}
          >
            All
          </Badge>
          {allTechs.map((tech) => (
            <Badge
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Array.isArray(visibleProjects) && visibleProjects.length > 0 ? (
          visibleProjects.map((project, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {project.image && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl flex items-start justify-between gap-2">
                    <span>{project.title}</span>
                    {project.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="default" size="sm" asChild className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            {t("projects.empty", "No projects found for the selected technology.")}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" onClick={() => setVisibleCount((prev) => prev + 6)}>
            {t("projects.loadMore", "Load More Projects")}
          </Button>
        </div>
      )}
    </section>
  );
}
