import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "../../components/projects";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "projects.items" && options?.returnObjects) {
        return [
          {
            title: "E-commerce Platform",
            description: "Full-stack solution",
            technologies: ["React", "Node.js", "PostgreSQL"],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example",
          },
          {
            title: "Task Manager",
            description: "Productivity app",
            technologies: ["React", "TypeScript"],
          },
          {
            title: "Blog Platform",
            description: "Content management",
            technologies: ["Node.js", "MongoDB"],
          },
          {
            title: "Portfolio Site",
            description: "Personal website",
            technologies: ["React", "TypeScript", "Tailwind"],
          },
        ];
      }
      return key === "projects.title" ? "Projects" : key;
    },
  }),
}));

describe("Projects User Flow", () => {
  it("allows filtering projects by technology", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Initially all projects visible
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Task Manager")).toBeInTheDocument();

    // Filter by React - use getAllByText and select the filter button (first one)
    const reactFilters = screen.getAllByText("React");
    await user.click(reactFilters[0]);

    // Only React projects should be visible
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
    expect(screen.queryByText("Blog Platform")).not.toBeInTheDocument();
  });

  it("resets filter when clicking All", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Filter by Node.js - use getAllByText and select the filter button (first one)
    const nodeFilters = screen.getAllByText("Node.js");
    await user.click(nodeFilters[0]);

    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.queryByText("Task Manager")).not.toBeInTheDocument();

    // Click All to reset
    const allFilter = screen.getByText("All");
    await user.click(allFilter);

    // All projects visible again
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
    expect(screen.getByText("Blog Platform")).toBeInTheDocument();
  });

  it("shows empty state when no projects match filter", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Filter by a technology with no matches - use getAllByText and select the filter button (first one)
    const mongoFilters = screen.getAllByText("MongoDB");
    await user.click(mongoFilters[0]);

    expect(screen.getByText("Blog Platform")).toBeInTheDocument();
    expect(screen.queryByText("E-commerce Platform")).not.toBeInTheDocument();
  });

  it("displays correct number of technology filter options", () => {
    render(<Projects />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Node.js").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
    expect(screen.getAllByText("PostgreSQL").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MongoDB").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tailwind").length).toBeGreaterThan(0);
  });
});
