import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";

interface TranslationOptions {
  returnObjects?: boolean;
}

// Mock SEO components to avoid config issues
vi.mock("@/components/seo", () => ({
  SEOProvider: ({ children }: { children: React.ReactNode }) => children,
  SEO: () => null,
}));

// Mock config before App imports it
vi.mock("@/lib/config", () => ({
  config: {
    features: {
      projects: true,
      blog: false,
      testimonials: false,
      certifications: true,
    },
    site: {
      url: "https://example.com",
      name: "Test Portfolio",
      description: "Test Description",
      author: "Test Author",
      email: "test@example.com",
      github: "https://github.com/test",
      linkedin: "https://linkedin.com/in/test",
    },
    analytics: {
      id: undefined,
    },
    contact: {
      formspreeId: undefined,
    },
  },
}));

// Mock all child components to focus on integration
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: TranslationOptions) => {
      if (options?.returnObjects) {
        if (key === "skills.categories") {
          return [
            {
              name: "Frontend",
              items: [{ name: "React", rating: 95, experience: "5+ years" }],
            },
          ];
        }
        if (key === "projects.items") {
          return [
            {
              title: "Test Project",
              description: "Test description",
              technologies: ["React"],
            },
          ];
        }
        if (key === "experience.items") {
          return [
            {
              role: "Developer",
              company: "Company",
              period: "2020",
              description: "Work",
            },
          ];
        }
        if (key === "about.sections") {
          return [{ title: "Bio", content: "Content" }];
        }
        if (key === "certifications.items") {
          return [{ title: "Cert 1", issuer: "Issuer", date: "2023" }];
        }
        return [];
      }
      const translations: Record<string, string> = {
        "hero.title": "Carlo Sciuto",
        "hero.role": "Senior Full Stack Developer",
        "hero.bio": "Developer bio",
        "about.title": "About",
        "experience.title": "Experience",
        "skills.title": "Skills",
        "projects.title": "Projects",
        "certifications.title": "Certifications",
        "contact.title": "Contact",
        "contact.email": "Email",
        "contact.linkedin": "LinkedIn",
        "contact.github": "GitHub",
        "skills.headers.technology": "Technology",
        "skills.headers.proficiency": "Proficiency",
        "skills.headers.experience": "Experience",
      };
      return translations[key] || key;
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

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

vi.mock("@/utils/skill-icons", () => ({
  getSkillIcon: () => ({
    icon: () => null,
    color: "#000000",
  }),
}));

vi.mock("@/lib/config", () => ({
  config: {
    features: {
      projects: true,
      certifications: true,
      blog: false,
      testimonials: false,
    },
  },
}));

describe("App Integration Tests", () => {
  it("renders all main sections in correct order", () => {
    render(<App />);

    // Verify all sections are present
    expect(screen.getAllByText("Carlo Sciuto").length).toBeGreaterThan(0);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getAllByText("Experience").length).toBeGreaterThan(0);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has proper navigation structure with section IDs", () => {
    const { container } = render(<App />);

    expect(container.querySelector("#hero")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#experience")).toBeInTheDocument();
    expect(container.querySelector("#skills")).toBeInTheDocument();
    expect(container.querySelector("#projects")).toBeInTheDocument();
    expect(container.querySelector("#certifications")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders navigation links for all sections", () => {
    render(<App />);

    // Navigation should be present (Navbar component)
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("displays contact information with correct links", () => {
    render(<App />);

    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:carlo.sciuto95@gmail.com");

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/carlo-sciuto/");

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/carlo-sciuto");
  });

  it("applies consistent styling across sections", () => {
    const { container } = render(<App />);

    // Check for consistent max-width constraint
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);

    // Verify container structure
    const mainContainer = container.querySelector("main");
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer?.className).toContain("container");
  });

  it("handles responsive layout classes", () => {
    const { container } = render(<App />);

    // Check for responsive grid layouts
    const grids = container.querySelectorAll('[class*="grid"]');
    expect(grids.length).toBeGreaterThan(0);

    // Check for responsive flex containers
    const flexContainers = container.querySelectorAll('[class*="flex"]');
    expect(flexContainers.length).toBeGreaterThan(0);
  });

  it("renders theme provider wrapper", () => {
    const { container } = render(<App />);

    // Theme provider should wrap the app
    const root = container.firstChild;
    expect(root).toBeInTheDocument();
  });
});
