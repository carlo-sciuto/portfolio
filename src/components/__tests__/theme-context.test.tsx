import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../theme-context";
import { ThemeProvider } from "../theme-provider";

describe("useTheme Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns theme context when used within ThemeProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toHaveProperty("theme");
    expect(result.current).toHaveProperty("setTheme");
    expect(typeof result.current.setTheme).toBe("function");
  });

  it("can change theme through setTheme function", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBeDefined();

    // Test that setTheme is callable and updates theme
    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
  });

  it("stores theme in localStorage when changed", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider storageKey="test-theme-hook">{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("light");
    });

    expect(localStorage.getItem("test-theme-hook")).toBe("light");
  });
});
