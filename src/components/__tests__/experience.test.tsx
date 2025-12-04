import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Experience } from "../experience";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "experience.items" && options?.returnObjects) {
        return [
          {
            role: "Senior Software Engineer",
            company: "Tech Company",
            period: "2020 - Present",
            description: "Leading development of web applications",
          },
          {
            role: "Full Stack Developer",
            company: "Startup Inc",
            period: "2018 - 2020",
            description: "Built scalable microservices",
          },
        ];
      }
      return key === "experience.title" ? "Experience" : key;
    },
  }),
}));

describe("Experience Component", () => {
  it("renders experience section with title", () => {
    render(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("displays all experience items", () => {
    render(<Experience />);

    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.getByText("2020 - Present")).toBeInTheDocument();

    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Startup Inc")).toBeInTheDocument();
  });

  it("renders cards with primary border accent", () => {
    const { container } = render(<Experience />);

    const cards = container.querySelectorAll('[class*="border-l-4"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has correct section id", () => {
    const { container } = render(<Experience />);

    const section = container.querySelector("#experience");
    expect(section).toBeInTheDocument();
  });

  it("applies hover animations to cards", () => {
    const { container } = render(<Experience />);

    // Cards have hover effects
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
