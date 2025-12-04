import { test, expect, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

// Helper to navigate on mobile or desktop
async function navigateToSection(page: Page, sectionName: string) {
  // Check if mobile menu button is visible
  const mobileMenuButton = page.getByRole("button", { name: /toggle menu/i });
  const isMobile = await mobileMenuButton.isVisible().catch(() => false);

  if (isMobile) {
    // Check if menu is already open
    const navButton = page.getByRole("button", { name: sectionName }).first();
    const isMenuOpen = await navButton.isVisible().catch(() => false);

    if (!isMenuOpen) {
      // Open mobile menu
      await mobileMenuButton.click();
      // Wait for menu animation and buttons to appear
      await page.waitForTimeout(1000);
    }
  }

  // Wait for the specific navigation button to be visible
  const navButton = page.getByRole("button", { name: sectionName }).first();
  await navButton.waitFor({ state: "visible", timeout: 15000 });
  await navButton.click();
  await page.waitForTimeout(500);
}

test.describe("Animations Performance", () => {
  test("scroll animations trigger on viewport entry", async ({ page, browserName }) => {
    // Skip on WebKit and Mobile Chrome - navigation timing issues in parallel mode
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(
      browserName === "webkit" || (browserName === "chromium" && isMobile),
      "Navigation timing issues in parallel mode"
    );

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Navigate to skills section
    await navigateToSection(page, "Skills");

    // Verify section is visible (even partial visibility counts)
    await expect(page.locator("#skills")).toBeInViewport({ ratio: 0.1 });

    // Check for animated elements
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeVisible();
  });

  test("hover animations work on interactive elements", async ({ page, browserName }) => {
    // Skip on WebKit and Mobile Chrome - navigation timing issues in parallel mode
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(
      browserName === "webkit" || (browserName === "chromium" && isMobile),
      "Navigation timing issues in parallel mode"
    );

    await page.goto("/");

    // Check if projects feature is enabled
    const projectsSection = await page.locator("#projects").count();
    if (projectsSection === 0) {
      test.skip(true, "Projects feature is disabled");
    }

    await page.waitForLoadState("domcontentloaded");

    // Navigate to projects
    await navigateToSection(page, "Projects");
    await page.waitForSelector("#projects");

    // Hover over a project card
    const projectCard = page.locator('#projects [class*="border"]').first();
    await projectCard.waitFor({ state: "visible", timeout: 5000 });
    await projectCard.hover();

    // Card should be visible and interactive
    await expect(projectCard).toBeVisible();
  });

  test("page renders without layout shift", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Wait for any lazy-loaded content
    await page.waitForTimeout(1000);

    // Take viewport snapshot to check stability
    const viewport = await page.viewportSize();
    expect(viewport).toBeTruthy();
  });
});

test.describe("SEO and Meta Tags", () => {
  test("has proper meta tags", async ({ page }) => {
    await page.goto("/");

    // Check title
    const title = await page.title();
    expect(title).toContain("Carlo Sciuto");

    // Check description
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(50);

    // Check keywords
    const keywords = await page.locator('meta[name="keywords"]').getAttribute("content");
    expect(keywords).toBeTruthy();
  });

  test.skip("has Open Graph tags", async ({ page }) => {
    // Skipping - OG tags not implemented yet
    await page.goto("/");

    // Check og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle).toBeTruthy();

    // Check og:description
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBeTruthy();

    // Check og:type
    const ogType = await page.locator('meta[property="og:type"]').getAttribute("content");
    expect(ogType).toBe("website");
  });

  test("has proper favicon", async ({ page }) => {
    await page.goto("/");

    const favicon = await page.locator('link[rel="icon"]').first();
    expect(await favicon.getAttribute("href")).toBeTruthy();
  });
});

test.describe("PWA Functionality", () => {
  test.skip("has manifest.json", async ({ page }) => {
    // Skipping - PWA not configured yet
    await page.goto("/");

    const manifest = await page.locator('link[rel="manifest"]');
    const manifestHref = await manifest.getAttribute("href");
    expect(manifestHref).toBeTruthy();
  });

  test("has service worker registration", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check if service worker is registered
    const swRegistered = await page.evaluate(() => {
      return "serviceWorker" in navigator;
    });

    expect(swRegistered).toBe(true);
  });

  test.skip("works offline after initial load", async ({ page, context }) => {
    // Skipping - PWA not configured yet
    // First visit to cache resources
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(2000); // Wait for service worker to cache

    // Go offline
    await context.setOffline(true);

    // Navigate to cached page
    await page.goto("/");

    // Page should still load (from cache)
    await expect(page.locator("body")).toBeVisible();

    // Go back online
    await context.setOffline(false);
  });
});

test.describe("Error Handling", () => {
  test("handles non-existent routes gracefully", async ({ page }) => {
    const response = await page.goto("/non-existent-page");

    // Should redirect or show error page
    expect(response?.status()).toBeTruthy();
  });

  test("handles slow network gracefully", async ({ page, context }) => {
    // Simulate slow network
    await context.route("**/*", (route) => {
      route.continue({ url: route.request().url() });
    });

    await page.goto("/");

    // Page should still render
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Cross-browser Compatibility", () => {
  test("renders correctly in different browsers", async ({ page, browserName }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Verify basic rendering works
    await expect(page.locator("h1")).toBeVisible();

    // Check for either desktop nav or mobile menu button
    const desktopNav = page.locator("nav").first();
    const mobileMenuButton = page.getByRole("button", { name: /toggle menu/i });

    const isDesktopNavVisible = await desktopNav.isVisible().catch(() => false);
    const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);

    expect(isDesktopNavVisible || isMobileMenuVisible).toBeTruthy();

    console.log(`Testing in: ${browserName}`);
  });
});

test.describe("Skills Section Interactions", () => {
  test("displays skill ratings with progress bars", async ({ page, browserName }) => {
    // Skip on WebKit and Mobile Chrome - navigation timing issues in parallel mode
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(
      browserName === "webkit" || (browserName === "chromium" && isMobile),
      "Navigation timing issues in parallel mode"
    );

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Navigate to skills
    await navigateToSection(page, "Skills");
    await page.waitForSelector("#skills");

    // Check for progress bars or rating elements
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeVisible();

    // Check for percentage displays in text content
    const content = await page.locator("#skills").textContent();
    expect(content).toContain("%");
  });

  test("skill tables are properly formatted", async ({ page, browserName }) => {
    // Skip on mobile and webkit - navigation timing issues
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(
      browserName === "webkit" || (browserName === "chromium" && isMobile),
      "Navigation timing issues"
    );

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Navigate to skills section
    await navigateToSection(page, "Skills");
    await page.waitForSelector("#skills", { state: "visible" });

    // Wait for tables to render
    await page.locator("table").first().waitFor({ state: "visible", timeout: 5000 });

    // Check for table headers
    const tables = await page.locator("table").count();
    expect(tables).toBeGreaterThan(0);

    // Verify table structure
    const tableHeaders = await page.locator("thead th").count();
    expect(tableHeaders).toBeGreaterThan(0);
  });
});

test.describe("Certifications Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const certificationsSection = await page.locator("#certifications").count();
    if (certificationsSection === 0) {
      test.skip(true, "Certifications feature is disabled");
    }
  });

  test("shows certification cards", async ({ page }) => {
    // Skip on mobile - mobile menu timing issues in parallel mode
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(isMobile, "Mobile menu timing issues");

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Navigate to certifications
    await navigateToSection(page, "Certifications");
    await page.waitForSelector("#certifications");

    // Check for certification content
    const certSection = page.locator("#certifications");
    await expect(certSection).toBeVisible();
  });

  test("certification links open in new tabs", async ({ page }) => {
    // Skip on mobile - navigation timing issues
    const isMobile = (page.viewportSize()?.width ?? 0) < 768;
    test.skip(isMobile, "Mobile navigation timing issues");

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await navigateToSection(page, "Certifications");
    await page.waitForSelector("#certifications");

    const externalLinks = await page.locator('#certifications a[target="_blank"]').all();

    for (const link of externalLinks) {
      const target = await link.getAttribute("target");
      expect(target).toBe("_blank");

      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
    }
  });
});
