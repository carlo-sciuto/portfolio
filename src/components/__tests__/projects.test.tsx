import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "../projects";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "projects.items" && options?.returnObjects) {
        return [
          {
            title: "E-commerce Platform",
            description: "Full-stack e-commerce solution",
            technologies: ["React", "Node.js", "PostgreSQL"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example",
          },
          {
            title: "Task Manager",
            description: "Productivity app with real-time sync",
            technologies: ["React", "TypeScript", "Firebase"],
            githubUrl: "https://github.com/example2",
          },
        ];
      }
      const translations: Record<string, string> = {
        "projects.title": "Projects",
        "projects.loadMore": "Load More Projects",
        "projects.empty": "No projects found",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Projects Component", () => {
  it("renders projects section with title", () => {
    render(<Projects />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("displays all project cards", () => {
    render(<Projects />);

    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("shows technology filters", () => {
    render(<Projects />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Node.js").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
  });

  it("filters projects by technology", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const nodeFilter = screen.getAllByText("Node.js")[0];
    await user.click(nodeFilter);

    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.queryByText("Task Manager")).not.toBeInTheDocument();
  });

  it("displays external links when available", () => {
    render(<Projects />);

    const liveLinks = screen.getAllByRole("link", { name: /live/i });
    expect(liveLinks.length).toBeGreaterThan(0);
  });

  it("has correct section id", () => {
    const { container } = render(<Projects />);

    const section = container.querySelector("#projects");
    expect(section).toBeInTheDocument();
  });

  it("applies grid layout for responsive design", () => {
    const { container } = render(<Projects />);

    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain("md:grid-cols-2");
  });
});
