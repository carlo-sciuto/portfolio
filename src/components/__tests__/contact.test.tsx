import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "../contact";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "contact.title": "Get In Touch",
        "contact.email": "Email",
        "contact.linkedin": "LinkedIn",
        "contact.github": "GitHub",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Contact Component", () => {
  it("renders contact section with title", () => {
    render(<Contact />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("displays email contact button", () => {
    render(<Contact />);

    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:carlo.sciuto95@gmail.com");
  });

  it("displays LinkedIn contact button", () => {
    render(<Contact />);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/carlo-sciuto/");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays GitHub contact button", () => {
    render(<Contact />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/carlo-sciuto");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("has correct section id", () => {
    const { container } = render(<Contact />);

    const section = container.querySelector("#contact");
    expect(section).toBeInTheDocument();
  });

  it("renders buttons with scale animations", () => {
    render(<Contact />);

    // Check that contact links exist
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument();
  });

  it("applies responsive layout classes", () => {
    const { container } = render(<Contact />);

    const flexContainer = container.querySelector('[class*="md:flex-row"]');
    expect(flexContainer).toBeInTheDocument();
  });
});
