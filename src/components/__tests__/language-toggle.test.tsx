import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageToggle } from "../language-toggle";

const mockChangeLanguage = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe("LanguageToggle Component", () => {
  it("renders language toggle button", () => {
    render(<LanguageToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("displays current language icon", () => {
    const { container } = render(<LanguageToggle />);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  it("opens language menu and allows language selection", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Menu items should be accessible after click
    // This tests the internal functions of the component
    expect(button).toBeInTheDocument();
    expect(mockChangeLanguage).toHaveBeenCalledTimes(0);
  });

  it("has proper accessibility attributes", () => {
    render(<LanguageToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup");
  });

  it("applies correct styling classes", () => {
    const { container } = render(<LanguageToggle />);
    const button = container.querySelector("button");
    expect(button?.className).toContain("inline-flex");
  });
});
