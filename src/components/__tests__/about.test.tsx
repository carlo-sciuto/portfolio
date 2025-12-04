import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "../about";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "about.sections" && options?.returnObjects) {
        return [
          {
            title: "Background",
            content: "Experienced developer with diverse background",
          },
          {
            title: "Approach",
            content: "Focus on clean code and best practices",
          },
        ];
      }
      return key === "about.title" ? "About Me" : key;
    },
  }),
}));

describe("About Component", () => {
  it("renders about section with title", () => {
    render(<About />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("displays all bio sections", () => {
    render(<About />);

    expect(screen.getByText("Background")).toBeInTheDocument();
    expect(screen.getByText("Experienced developer with diverse background")).toBeInTheDocument();

    expect(screen.getByText("Approach")).toBeInTheDocument();
    expect(screen.getByText("Focus on clean code and best practices")).toBeInTheDocument();
  });

  it("renders cards with hover effects", () => {
    const { container } = render(<About />);

    // Cards have hover shadow effects
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has correct section id", () => {
    const { container } = render(<About />);

    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
  });

  it("applies stagger animation container", () => {
    const { container } = render(<About />);

    const staggerContainer = container.querySelector('[class*="space-y"]');
    expect(staggerContainer).toBeInTheDocument();
  });
});
