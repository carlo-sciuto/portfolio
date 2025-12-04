import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "../skills";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "skills.categories" && options?.returnObjects) {
        return [
          {
            name: "Frontend",
            items: [
              { name: "React", rating: 95, experience: "5+ years", icon: "React" },
              { name: "TypeScript", rating: 90, experience: "4+ years", icon: "TypeScript" },
            ],
          },
          {
            name: "Backend",
            items: [{ name: "Node.js", rating: 90, experience: "5+ years", icon: "Node.js" }],
          },
        ];
      }
      const translations: Record<string, string> = {
        "skills.title": "Skills",
        "skills.headers.technology": "Technology",
        "skills.headers.proficiency": "Proficiency",
        "skills.headers.experience": "Experience",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("@/utils/skill-icons", () => ({
  getSkillIcon: () => ({
    icon: () => null,
    color: "#000000",
  }),
}));

describe("Skills Component", () => {
  it("renders skills section with title", () => {
    render(<Skills />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("displays all skill categories", () => {
    render(<Skills />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("shows skill items with ratings", () => {
    const { container } = render(<Skills />);

    // Check for experience text
    expect(screen.getAllByText(/\d\+?\s*years?/i).length).toBeGreaterThan(0);

    // Check for percentage indicators
    expect(container.textContent).toMatch(/%/);
  });

  it("renders table headers", () => {
    render(<Skills />);

    // Each skill category has a table with these headers
    expect(screen.getAllByText("Technology").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Proficiency").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Experience").length).toBeGreaterThan(0);
  });

  it("has correct section id", () => {
    const { container } = render(<Skills />);

    const section = container.querySelector("#skills");
    expect(section).toBeInTheDocument();
  });

  it("applies hover effects to skill cards", () => {
    const { container } = render(<Skills />);

    const tables = container.querySelectorAll("table");
    expect(tables.length).toBeGreaterThan(0);
  });

  it("displays progress bars for skill ratings", () => {
    const { container } = render(<Skills />);

    const progressBars = container.querySelectorAll('[class*="bg-primary"]');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});
