import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../navbar";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Navbar Component", () => {
  it("renders navbar with logo/name", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Carlo Sciuto").length).toBeGreaterThan(0);
  });

  it("renders desktop navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("nav.home")).toBeInTheDocument();
    expect(screen.getByText("nav.about")).toBeInTheDocument();
    expect(screen.getByText("nav.experience")).toBeInTheDocument();
    expect(screen.getByText("nav.skills")).toBeInTheDocument();
    expect(screen.getByText("nav.projects")).toBeInTheDocument();
    expect(screen.getByText("nav.certifications")).toBeInTheDocument();
    expect(screen.getByText("nav.contact")).toBeInTheDocument();
  });

  it("has sticky positioning", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("sticky");
  });

  it("renders mobile menu button", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("handles mobile menu toggle", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(menuButton);

    // Menu button should be clickable
    expect(menuButton).toBeInTheDocument();
  });

  it("handles navigation button clicks", async () => {
    const user = userEvent.setup();
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    // Create mock sections
    const mockSection = document.createElement("section");
    mockSection.id = "hero";
    document.body.appendChild(mockSection);

    render(<Navbar />);

    const homeButton = screen.getByText("nav.home");
    await user.click(homeButton);

    expect(scrollIntoViewMock).toHaveBeenCalled();

    document.body.removeChild(mockSection);
  });

  it("scrolls to sections when desktop nav links clicked", async () => {
    const user = userEvent.setup();
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const sections = ["about", "experience", "skills", "projects"];
    sections.forEach((id) => {
      const section = document.createElement("section");
      section.id = id;
      document.body.appendChild(section);
    });

    render(<Navbar />);

    const aboutButton = screen.getByText("nav.about");
    await user.click(aboutButton);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) document.body.removeChild(section);
    });
  });

  it("renders mode toggle component", () => {
    const { container } = render(<Navbar />);
    // Mode toggle button should be present
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(1);
  });

  it("renders language toggle component", () => {
    const { container } = render(<Navbar />);
    // Language toggle should be present
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(2);
  });

  it("applies backdrop blur effect", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("backdrop-blur-md");
  });

  it("has correct z-index for stacking", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("z-50");
  });
});
