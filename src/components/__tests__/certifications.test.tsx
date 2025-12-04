import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Certifications } from "../certifications";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "certifications.items" && options?.returnObjects) {
        return [
          {
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023",
            credlyUrl: "https://credly.com/badge1",
            credlyBadgeId: "badge123",
          },
          {
            title: "Google Cloud Professional",
            issuer: "Google",
            date: "2022",
            verificationUrl: "https://google.com/verify",
          },
        ];
      }
      const translations: Record<string, string> = {
        "certifications.title": "Certifications",
        "certifications.verify": "Verify",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Certifications Component", () => {
  it("renders certifications section with title", () => {
    render(<Certifications />);
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });

  it("displays all certification cards", () => {
    render(<Certifications />);

    expect(screen.getByText("AWS Certified Solutions Architect")).toBeInTheDocument();
    expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();

    expect(screen.getByText("Google Cloud Professional")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("shows verification links", () => {
    render(<Certifications />);

    const verifyLinks = screen.getAllByText("Verify");
    expect(verifyLinks.length).toBeGreaterThan(0);
  });

  it("has correct section id", () => {
    const { container } = render(<Certifications />);

    const section = container.querySelector("#certifications");
    expect(section).toBeInTheDocument();
  });

  it("applies grid layout for responsive design", () => {
    const { container } = render(<Certifications />);

    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders cards with hover effects", () => {
    const { container } = render(<Certifications />);

    // Cards have hover effects
    const cards = container.querySelectorAll('[class*="hover"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});
