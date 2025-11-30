import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ModeToggle } from "../mode-toggle";
import * as ThemeContext from "../theme-context";

// Mock useTheme
const setThemeMock = vi.fn();
vi.spyOn(ThemeContext, "useTheme").mockReturnValue({
  theme: "light",
  setTheme: setThemeMock,
});

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: "en",
    },
    ready: true,
  }),
}));

describe("ModeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset userAgent mock
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      configurable: true,
    });
  });

  it("calls startViewTransition on supported desktop browsers", () => {
    const startViewTransitionMock = vi.fn((cb) => {
      cb();
      return {
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        finished: Promise.resolve(),
        skipTransition: () => {},
      };
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).startViewTransition = startViewTransitionMock;

    render(<ModeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(startViewTransitionMock).toHaveBeenCalled();
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("skips startViewTransition on Safari", () => {
    const startViewTransitionMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (document as any).startViewTransition = startViewTransitionMock;

    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
      configurable: true,
    });

    render(<ModeToggle />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(startViewTransitionMock).not.toHaveBeenCalled();
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
