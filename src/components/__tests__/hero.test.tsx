import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../hero";

// Mock the i18next hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "hero.title": "Carlo Sciuto",
        "hero.role": "Senior Full Stack Developer",
        "hero.bio": "Passionate developer with 10+ years of experience",
        "hero.enableGyroscope": "Enable 3D Effect",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the 3D motion hook
vi.mock("@/hooks/use3DMotion", () => ({
  use3DMotion: () => ({
    rotateX: { get: () => 0 },
    rotateY: { get: () => 0 },
    handleMouseMove: vi.fn(),
    handleMouseLeave: vi.fn(),
    isMobile: false,
    permissionGranted: true,
    requestOrientationPermission: vi.fn(),
  }),
}));

describe("Hero Component", () => {
  it("renders hero section with title and role", () => {
    render(<Hero />);

    expect(screen.getByText("Carlo Sciuto")).toBeInTheDocument();
    expect(screen.getByText("Senior Full Stack Developer")).toBeInTheDocument();
    expect(
      screen.getByText("Passionate developer with 10+ years of experience")
    ).toBeInTheDocument();
  });

  it("displays avatar with fallback", () => {
    render(<Hero />);

    // Avatar should display fallback "CS" initials
    expect(screen.getByText("CS")).toBeInTheDocument();
  });

  it("shows floating arrow icon", () => {
    const { container } = render(<Hero />);

    // Check for arrow down icon (lucide svg)
    const arrow = container.querySelector("svg.lucide-arrow-down");
    expect(arrow).toBeInTheDocument();
  });

  it("has correct section id for navigation", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("#hero");
    expect(section).toBeInTheDocument();
  });

  it("applies responsive text classes", () => {
    render(<Hero />);

    const heading = screen.getByText("Carlo Sciuto");
    expect(heading.className).toContain("text-4xl");
    expect(heading.className).toContain("sm:text-5xl");
    expect(heading.className).toContain("md:text-6xl");
  });
});
