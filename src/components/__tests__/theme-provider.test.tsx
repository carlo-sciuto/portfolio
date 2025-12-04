import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "../theme-provider";
import { useTheme } from "../theme-context";

// Test component that uses theme context
function ThemeConsumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
}

describe("ThemeProvider Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders children correctly", () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("uses default theme when no stored theme", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  it("applies system theme when theme is system", async () => {
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    vi.stubGlobal("matchMedia", matchMediaMock);

    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("stores theme in localStorage when changed", async () => {
    const { getByText } = render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );

    const lightButton = getByText("Set Light");
    lightButton.click();

    await waitFor(() => {
      expect(localStorage.getItem("test-theme")).toBe("light");
    });
  });

  it("applies light class to document root", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const lightButton = getByText("Set Light");
    lightButton.click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(true);
    });
  });

  it("applies dark class to document root", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const darkButton = getByText("Set Dark");
    darkButton.click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("removes previous theme class when changing themes", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const lightButton = getByText("Set Light");
    lightButton.click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(true);
    });

    const darkButton = getByText("Set Dark");
    darkButton.click();

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(false);
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});
