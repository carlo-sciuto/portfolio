import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for animation components
const IntersectionObserverMock = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: () => [],
  unobserve: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Mock Web Animations API
Element.prototype.animate = vi.fn().mockImplementation(() => ({
  finished: Promise.resolve(),
  cancel: vi.fn(),
  play: vi.fn(),
  pause: vi.fn(),
  reverse: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

// Mock config module
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

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        const Component = ({
          children,
          ...props
        }: React.PropsWithChildren<Record<string, unknown>>) => {
          return React.createElement(prop, props, children);
        };
        Component.displayName = `motion.${prop}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({}),
  useInView: () => false,
  useMotionValue: (initial: number) => ({ get: () => initial, set: () => {} }),
  useTransform: () => ({ get: () => 0 }),
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
}));
