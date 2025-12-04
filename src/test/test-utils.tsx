import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Custom render function with common providers
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { ...options });
}

/**
 * Mock intersection observer for tests
 */
export function mockIntersectionObserver() {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
}

/**
 * Mock matchMedia for responsive tests
 */
export function mockMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

/**
 * Wait for animations to complete
 */
export function waitForAnimations() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

/**
 * Mock framer-motion for faster tests
 */
export function mockFramerMotion() {
  return {
    motion: {
      div: "div",
      section: "section",
      h1: "h1",
      h2: "h2",
      p: "p",
      button: "button",
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
}

export { screen, waitFor, within } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
