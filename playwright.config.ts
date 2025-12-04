import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 6 : 12,
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "off", // Disable trace for speed, enable only when debugging
    screenshot: "off", // Disable screenshots for speed
    video: "off", // Disable video for speed
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      fullyParallel: true,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      fullyParallel: true,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      fullyParallel: true,
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      fullyParallel: true,
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
      fullyParallel: true,
    },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
